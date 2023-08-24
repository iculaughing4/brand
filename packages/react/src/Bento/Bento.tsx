import React, {ReactHTML, ReactElement} from 'react'
import clsx from 'clsx'
import {Icon, IconProps} from '@primer/octicons-react'
import type {BaseProps} from '../component-helpers'
import {Heading, Text, Link, HeadingProps, TextProps, LinkProps, ColorModesEnum} from '../'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/base.css'
import styles from './Bento.module.css'

export type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
export type ColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type ResponsiveColumnIndex = Partial<Record<Size, ColumnIndex>> | ColumnIndex
type ResponsiveRowIndex = Partial<Record<Size, number>> | number

type Flow = 'row' | 'column'
type ResponsiveFlow = Partial<Record<Size, Flow>> | Flow

type Align = 'start' | 'center' | 'end'
type ResponsiveAlign = Partial<Record<Size, Align>> | Align

type BentoProps = React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement>

const Root = ({className, ...rest}: BentoProps) => {
  return <section className={clsx(styles.Bento, className)} {...rest}></section>
}

type BentoItemProps = {
  columnStart?: ResponsiveColumnIndex
  columnSpan?: ResponsiveColumnIndex
  rowStart?: ResponsiveRowIndex
  rowSpan?: ResponsiveRowIndex
  flow?: ResponsiveFlow
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  visualAsBackground?: boolean
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const returnClassBasedOnResponsiveMap = (
  propName: string,
  prop?: ResponsiveColumnIndex | ResponsiveRowIndex | ResponsiveFlow | ResponsiveAlign,
) => {
  const classesToMerge: string[] = []
  if (typeof prop === 'number' || typeof prop === 'string') {
    classesToMerge.push(styles[`Bento__Item--${propName}-${prop}`])
  } else if (typeof prop === 'object') {
    for (const [key, value] of Object.entries(prop)) {
      classesToMerge.push(styles[`Bento__Item--${key}-${propName}-${value}`])
    }
  }
  return classesToMerge
}

const Item = ({
  className,
  columnStart,
  columnSpan,
  rowStart,
  rowSpan,
  flow,
  colorMode,
  visualAsBackground = false,
  children,
  ...rest
}: BentoItemProps) => {
  const bentoItemClassArray = [styles.Bento__Item]
  bentoItemClassArray.push(
    ...returnClassBasedOnResponsiveMap('column-span', columnSpan),
    ...returnClassBasedOnResponsiveMap('row-span', rowSpan),
    ...returnClassBasedOnResponsiveMap('column-start', columnStart),
    ...returnClassBasedOnResponsiveMap('row-start', rowStart),
    ...returnClassBasedOnResponsiveMap('flow', flow),
  )

  const colorModeProp = colorMode ? {'data-color-mode': colorMode} : {}

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
      {children}
    </div>
  )
}

type BentoContentProps = {
  leadingVisual?: ReactElement | Icon
  padding?: 'condensed' | 'normal' | 'spacious'
  verticalAlign?: ResponsiveAlign
  horizontalAlign?: ResponsiveAlign
  fixedBottomLink?: boolean
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Content = ({
  children,
  leadingVisual: LeadingVisual,
  padding = 'normal',
  verticalAlign = 'start',
  horizontalAlign = 'start',
  fixedBottomLink = false,
  className,
  ...rest
}: BentoContentProps) => {
  const bentoContentClassArray = [styles.Bento__Content]
  bentoContentClassArray.push(
    ...returnClassBasedOnResponsiveMap('verticalAlign', verticalAlign),
    ...returnClassBasedOnResponsiveMap('horizontalAlign', horizontalAlign),
  )
  const HeadingChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === Heading,
  )
  const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)
  const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)
  return (
    <div className={clsx(styles[`Bento-padding--${padding}`], ...bentoContentClassArray, className)} {...rest}>
      {React.isValidElement(LeadingVisual) &&
        React.cloneElement(LeadingVisual as React.ReactElement<IconProps>, {
          size: LeadingVisual['size'] || 44,
        })}
      {React.isValidElement(HeadingChild) &&
        React.cloneElement(HeadingChild as React.ReactElement<HeadingProps>, {
          as: HeadingChild.props.as || 'h3',
          size: HeadingChild.props.size || '3',
        })}
      {React.isValidElement(TextChild) &&
        React.cloneElement(TextChild as React.ReactElement<TextProps>, {
          variant: TextChild.props.variant || 'muted',
          as: 'p',
        })}
      {React.isValidElement(LinkChild) &&
        React.cloneElement(LinkChild as React.ReactElement<LinkProps>, {
          className: clsx(
            styles['Bento__call-to-action'],
            fixedBottomLink && styles['Bento__call-to-action--fixed'],
            LinkChild.props.className,
          ),
        })}
    </div>
  )
}

type BentoVisualProps = {
  fillMedia?: boolean
  position?: string
  padding?: 'condensed' | 'normal' | 'spacious'
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Visual = ({fillMedia = true, position = '50% 50%', padding, className, children, ...rest}: BentoVisualProps) => {
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
      className={clsx(
        styles.Bento__Visual,
        !fillMedia && styles['Bento__Visual-no-fill'],
        !!padding && styles[`Bento-padding--${padding}`],
        className,
      )}
      {...rest}
    >
      {childrenToRender}
    </div>
  )
}

export const Bento = Object.assign(Root, {Item, Visual, Content})
