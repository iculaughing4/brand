import React, {forwardRef, PropsWithChildren, HTMLAttributes, type Ref} from 'react'
import clsx from 'clsx'
import {Button, ButtonBaseProps, Heading, HeadingProps, Text, UnorderedList, UnorderedListProps} from '..'
import type {BaseProps} from '../component-helpers'
import {useAnimation} from '../animation'

/**
 * Design tokens
 */
// import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pricing-cards/base.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './PricingCards.module.css'

export type PricingCardsProps<C extends keyof JSX.IntrinsicElements = 'section'> = React.HTMLAttributes<C> & {
  /**
   * The HTML element used to render the PricingCards.
   */
  as?: C | 'section' | 'div'
} & (C extends 'section' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const PricingCardsRoot = forwardRef(
  (
    {children, className, animate, as = 'section', style, ...rest}: PropsWithChildren<PricingCardsProps>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const filteredChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (child.type === PricingCardsItem) {
          return true
        }
      }
      return false
    })

    const validElements = ['div', 'section']
    const Component = validElements.includes(as) ? as : 'div'

    return (
      <Component
        className={clsx(
          styles.PricingCards,
          styles[`PricingCards--items-${filteredChildren.length}`],
          animationClasses,
          className,
        )}
        ref={ref}
        {...(rest as HTMLAttributes<HTMLElement>)}
        style={{...animationInlineStyles, ...style}}
      >
        {filteredChildren.filter(child => {
          if (React.isValidElement(child) && child.type === PricingCardsItem) {
            return true
          }
          return false
        })}
      </Component>
    )
  },
)

export type PricingCardsItem<C extends keyof JSX.IntrinsicElements = 'article'> = React.HTMLAttributes<C> & {
  /**
   * The HTML element used to render individual PricingCards items.
   */
  as?: C | 'article' | 'div'
} & (C extends 'article' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const PricingCardsItem = forwardRef(
  (
    {children, className, animate, as = 'article', style, ...rest}: PropsWithChildren<PricingCardsItem>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const filteredChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (
          child.type === PricingCardsLabel ||
          child.type === PricingCardsHeading ||
          child.type === PricingCardsDescription ||
          child.type === PricingCardsPrice ||
          child.type === PricingCardsFeatureList
        ) {
          return true
        }
      }
      return false
    })

    const filteredActions = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (child.type === PricingCardsPrimaryAction || child.type === PricingCardsSecondaryAction) {
          return true
        }
      }
      return false
    })

    const validElements = ['div', 'article']
    const Component = validElements.includes(as) ? as : 'div'

    return (
      <Component
        className={clsx(styles.PricingCards__item, animationClasses, className)}
        ref={ref}
        {...(rest as HTMLAttributes<HTMLElement>)}
        style={{...animationInlineStyles, ...style}}
      >
        {filteredChildren}

        <footer className={styles.PricingCards__actions}>{filteredActions}</footer>
      </Component>
    )
  },
)

type PricingCardsLabelProps = PropsWithChildren<BaseProps<HTMLSpanElement>>

const PricingCardsLabel = forwardRef<HTMLSpanElement, PricingCardsLabelProps>(({children, className, ...rest}, ref) => {
  return (
    <Text ref={ref} size="100" weight="semibold" className={clsx(styles.PricingCards__label, className)} {...rest}>
      {children}
    </Text>
  )
})

type PricingCardsDescriptionProps = PropsWithChildren<BaseProps<HTMLParagraphElement>>

const PricingCardsDescription = forwardRef<HTMLParagraphElement, PricingCardsDescriptionProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <Text
        variant="muted"
        ref={ref}
        size="200"
        as="p"
        className={clsx(styles.PricingCards__description, className)}
        {...rest}
      >
        {children}
      </Text>
    )
  },
)

type PricingCardsHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
  as?: Exclude<HeadingProps['as'], 'h1' | 'h2'>
} & HeadingProps

const PricingCardsHeading = forwardRef<HTMLHeadingElement, PricingCardsHeadingProps>(
  ({children, as = 'h3', size = '5', className, ...rest}, ref) => {
    return (
      <Heading
        size={size}
        className={clsx(styles.PricingCards__heading, styles[`PricingCards__heading--size-${size}`], className)}
        ref={ref}
        as={as}
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)

type PricingCardsPriceProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  currencySymbol?: string
  currencySymbolPosition?: 'leading' | 'trailing'
  trailingText?: string
}

const PricingCardsPrice = forwardRef<HTMLParagraphElement, PricingCardsPriceProps>(
  ({children, className, currencySymbol, currencySymbolPosition = 'leading', trailingText, ...rest}, ref) => {
    const currencySymbolMarkup = (
      <Text as="span" size="500" weight="normal" className={styles['PricingCards__price-currency-symbol']}>
        {currencySymbol}
      </Text>
    )

    return (
      <Text as="p" weight="normal" ref={ref} className={clsx(styles.PricingCards__price, className)} {...rest}>
        {currencySymbolPosition === 'leading' && currencySymbolMarkup}

        <Text as="span" size="700" weight="normal" className={styles['PricingCards__price-value']}>
          {children}
        </Text>

        {currencySymbolPosition === 'trailing' && currencySymbolMarkup}

        {trailingText && (
          <Text
            as="span"
            size="100"
            weight="light"
            variant="muted"
            className={styles['PricingCards__price-trailing-text']}
          >
            {trailingText}
          </Text>
        )}
      </Text>
    )
  },
)

type PricingCardsFeatureListProps = PropsWithChildren<BaseProps<HTMLUListElement>> & {
  children: typeof PricingCardsFeatureListItem | (typeof PricingCardsFeatureListItem)[]
} & UnorderedListProps

const PricingCardsFeatureList = forwardRef<HTMLUListElement, PricingCardsFeatureListProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <UnorderedList
        ref={ref}
        className={clsx(styles['PricingCards__feature-list'], className)}
        variant="checked"
        {...(rest as UnorderedListProps)}
      >
        {children}
      </UnorderedList>
    )
  },
)

type PricingCardsFeatureListItemProps = PropsWithChildren<BaseProps<HTMLLIElement>>

const PricingCardsFeatureListItem = forwardRef<HTMLLIElement, PricingCardsFeatureListItemProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <UnorderedList.Item ref={ref} className={clsx(styles['PricingCards__feature-list-item'], className)} {...rest}>
        {' '}
        {children}
      </UnorderedList.Item>
    )
  },
)

type RestrictedPolymorphism =
  | (BaseProps<HTMLAnchorElement> & {as?: 'a'})
  | (BaseProps<HTMLButtonElement> & {as?: 'button'})

type PricingCardsActions = {
  as?: 'a' | 'button'
  href: string
} & ButtonBaseProps &
  RestrictedPolymorphism

const PricingCardsPrimaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<PricingCardsActions>
>(({as, children, className, ...rest}, ref) => {
  return (
    <Button
      as={as}
      className={clsx(styles['PricingCards__primary-action'], className)}
      variant="primary"
      {...rest}
      ref={ref as React.Ref<HTMLButtonElement>}
      block
    >
      {children}
    </Button>
  )
})

const PricingCardsSecondaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<PricingCardsActions>
>(({as, children, className, ...rest}, ref) => {
  return (
    <Button
      as={as}
      className={clsx(styles['PricingCards__primary-action'], className)}
      variant="secondary"
      {...rest}
      ref={ref as React.Ref<HTMLButtonElement>}
      block
    >
      {children}
    </Button>
  )
})

/**
 * Pricing card component:
 * {@link https://primer.style/brand/components/PricingCards/ See usage examples}.
 */
export const PricingCards = Object.assign(PricingCardsRoot, {
  Item: PricingCardsItem,
  Label: PricingCardsLabel,
  Heading: PricingCardsHeading,
  Description: PricingCardsDescription,
  Price: PricingCardsPrice,
  FeatureList: PricingCardsFeatureList,
  FeatureListItem: PricingCardsFeatureListItem,
  PrimaryAction: PricingCardsPrimaryAction,
  SecondaryAction: PricingCardsSecondaryAction,
})
