import React, {ReactHTML, ReactElement, forwardRef, useCallback, useMemo, Ref, PropsWithChildren} from 'react'
import clsx from 'clsx'
import {Icon, IconProps} from '@primer/octicons-react'
import {useWindowSize, BreakpointSize} from '../hooks/useWindowSize'
import type {BaseProps} from '../component-helpers'
import {Heading, Text, Link, HeadingProps, TextProps, LinkProps, ColorModesEnum} from '../'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/base.css'
import styles from './Bento.module.css'

export type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
export type ColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type ResponsiveColumnIndex = Partial<Record<Size, ColumnIndex>>
type ResponsiveRowIndex = Partial<Record<Size, number>>

type Flow = 'row' | 'column'
type ResponsiveFlow = Partial<Record<Size, Flow>>

type Align = 'start' | 'center' | 'end'
type ResponsiveAlign = Partial<Record<Size, Align>>

type Padding = 'condensed' | 'normal' | 'spacious'
type ResponsivePadding = Partial<Record<Size, Padding>>

type Order = 'default' | 'reversed'
type ResponsiveOrder = Partial<Record<Size, Order>>

type BentoProps = React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement>

const Root = ({className, ...rest}: BentoProps) => {
  return <section className={clsx(styles.Bento, className)} {...rest}></section>
}

type ValidItemChildren = React.ReactElement<BentoVisualProps | BentoContentProps>[]

type BentoItemProps = {
  columnStart?: ColumnIndex | ResponsiveColumnIndex
  columnSpan?: ColumnIndex | ResponsiveColumnIndex
  rowStart?: number | ResponsiveRowIndex
  rowSpan?: number | ResponsiveRowIndex
  flow?: Flow | ResponsiveFlow
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  visualAsBackground?: boolean
  order?: Order | ResponsiveOrder
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const returnClassBasedOnResponsiveMap = (
  classIdentifier: string,
  propName: string,
  prop?:
    | ResponsiveColumnIndex
    | ColumnIndex
    | ResponsiveRowIndex
    | number
    | ResponsiveFlow
    | Flow
    | ResponsiveAlign
    | Align
    | ResponsivePadding
    | Padding,
) => {
  const classesToMerge: string[] = []
  if (typeof prop === 'number' || typeof prop === 'string') {
    classesToMerge.push(styles[`${classIdentifier}--${propName}-${prop}`])
  } else if (typeof prop === 'object') {
    for (const [key, value] of Object.entries(prop)) {
      classesToMerge.push(styles[`${classIdentifier}--${key}-${propName}-${value}`])
    }
  }
  return classesToMerge
}

type ReturnOrderedChildrenProps = {
  order: Order | ResponsiveOrder
  children: React.ReactNode
  currentBreakpointSize?: BreakpointSize
}

const returnOrderedChildren = ({order, children, currentBreakpointSize}: ReturnOrderedChildrenProps) => {
  if (typeof order === 'string') {
    return order === 'default' ? children : React.Children.toArray(children).reverse()
  } else if (typeof order === 'object' && currentBreakpointSize) {
    // This handles setting the order based on breakpoints as you might expect via CSS
    const filledStyleOrder: ResponsiveOrder = {}
    let previousSize: Order = 'default'
    for (const size of Object.keys(BreakpointSize)) {
      const lowerCaseSize = size.toLocaleLowerCase()
      if (order[lowerCaseSize]) previousSize = order[lowerCaseSize]
      filledStyleOrder[lowerCaseSize] = order[lowerCaseSize] || previousSize
    }
    return filledStyleOrder[currentBreakpointSize] === 'default' ? children : React.Children.toArray(children).reverse()
  } else {
    return children
  }
}

const Item = ({
  className,
  columnStart,
  columnSpan = 12,
  rowStart,
  rowSpan,
  flow = 'row',
  colorMode,
  visualAsBackground = false,
  order = 'default',
  children,
  ...rest
}: BentoItemProps) => {
  const {currentBreakpointSize} = useWindowSize()
  const bentoItemClassArray = [styles.Bento__Item]
  bentoItemClassArray.push(
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'column-span', columnSpan),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'row-span', rowSpan),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'column-start', columnStart),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'row-start', rowStart),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'flow', flow),
  )

  if (!visualAsBackground) {
    flow === 'column' && bentoItemClassArray.push(styles['Bento-column-padding-override'])
    flow === 'row' && bentoItemClassArray.push(styles['Bento-row-padding-override'])
  }

  const colorModeProp = colorMode ? {'data-color-mode': colorMode} : {}

  const validChildren = React.Children.toArray(children).reduce<ValidItemChildren>((acc, child) => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      if (child.type === Visual) {
        acc.push(child as React.ReactElement<BentoVisualProps>)
      }
      if (child.type === Content) {
        acc.push(child as React.ReactElement<BentoContentProps>)
      }
    }
    return acc
  }, [])

  const orderedChildren = returnOrderedChildren({order, children: validChildren, currentBreakpointSize})

  return (
    <div
      {...colorModeProp}
      className={clsx(
        ...bentoItemClassArray,
        visualAsBackground && styles[`Bento__Item--visual-as-background`],
        className,
      )}
      {...rest}
    >
      {orderedChildren}
    </div>
  )
}

type BentoContentProps = {
  leadingVisual?: ReactElement | Icon
  padding?: Padding | ResponsivePadding
  verticalAlign?: Align | ResponsiveAlign
  horizontalAlign?: Exclude<Align, 'end'> | Partial<Record<Size, Exclude<Align, 'end'>>>
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Content = ({
  children,
  leadingVisual: LeadingVisual,
  padding = 'spacious',
  verticalAlign = 'start',
  horizontalAlign = 'start',
  className,
  ...rest
}: BentoContentProps) => {
  const bentoContentClassArray = [styles.Bento__Content]
  bentoContentClassArray.push(
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'verticalAlign', verticalAlign),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'horizontalAlign', horizontalAlign),
    ...returnClassBasedOnResponsiveMap('Bento', 'padding', padding),
  )
  const HeadingChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === _Heading,
  )

  const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)
  const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)
  return (
    <div className={clsx(styles[`Bento-padding--${padding}`], ...bentoContentClassArray, className)} {...rest}>
      {React.isValidElement(LeadingVisual) &&
        React.cloneElement(LeadingVisual as React.ReactElement<IconProps>, {
          className: styles['Bento__Content-icon'],
          size: LeadingVisual['size'] || 44,
        })}
      {React.isValidElement(HeadingChild) && React.cloneElement(HeadingChild as React.ReactElement<BentoHeadingProps>)}
      {React.isValidElement(TextChild) &&
        React.cloneElement(TextChild as React.ReactElement<TextProps>, {
          variant: TextChild.props.variant || 'muted',
          as: TextChild.props.as || 'p',
          size: TextChild.props.size || '300',
          className: clsx(styles['Bento__Content-text'], TextChild.props.className),
        })}
      {React.isValidElement(LinkChild) &&
        React.cloneElement(LinkChild as React.ReactElement<LinkProps>, {
          variant: LinkChild.props.variant || 'accent',
          className: clsx(styles['Bento__call-to-action'], LinkChild.props.className),
        })}
    </div>
  )
}

type BentoHeadingProps = BaseProps<HTMLHeadingElement> & HeadingProps

const defaultHeadingTag = 'h3'
const defaultHeadingSize = '5'
const defaultHeadingWeight = 'medium'

const _Heading = forwardRef(
  (
    {
      as = defaultHeadingTag,
      size = defaultHeadingSize,
      weight = defaultHeadingWeight,
      className,
      children,
      ...props
    }: PropsWithChildren<BentoHeadingProps>,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    const childrenArray = useMemo(() => React.Children.toArray(children), [children])

    const getConditionalVariant = useCallback(() => {
      if (childrenArray.some(child => React.isValidElement(child) && child.type === 'em')) {
        return 'muted'
      }
      return 'default'
    }, [childrenArray])

    const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant()

    return (
      <Heading
        ref={ref}
        className={clsx(defaultColor === 'muted' && styles[`Bento__heading--muted`], className)}
        size={size}
        as={as}
        weight={weight}
        {...props}
      >
        {children}
      </Heading>
    )
  },
)

type BentoVisualProps = {
  fillMedia?: boolean
  position?: string
  padding?: Padding | ResponsivePadding
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Visual = ({fillMedia = true, position = '50% 50%', padding, className, children, ...rest}: BentoVisualProps) => {
  const bentoVisualClassArray = [styles.Bento__Visual]
  bentoVisualClassArray.push(...returnClassBasedOnResponsiveMap('Bento', 'padding', padding))
  const childrenToRender = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === 'img') {
        return React.cloneElement(child as ReturnType<ReactHTML['img']>, {
          style: {objectPosition: position},
        })
      }
      return child
    }
  })
  return (
    <div
      className={clsx(...bentoVisualClassArray, !fillMedia && styles['Bento__Visual--no-fill'], className)}
      {...rest}
    >
      {childrenToRender}
    </div>
  )
}

export const Bento = Object.assign(Root, {Item, Visual, Content, Heading: _Heading})
