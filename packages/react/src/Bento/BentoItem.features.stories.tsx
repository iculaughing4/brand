import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Bento} from '.'
import {Heading, Text, Link} from '../'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'
import universeImage from '../fixtures/images/placeholder-visual-universe.png'

export default {
  title: 'Components/Bento/Item',
  component: Bento,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof Bento>

export const VisualPositionBottom: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual position="50% 100%">
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualPositionBottom.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const FlowColumn: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

FlowColumn.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const FlowColumnVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
  </Bento.Item>
)

FlowColumnVisualFirst.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const FlowRowVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="row">
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
  </Bento.Item>
)

FlowRowVisualFirst.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const HeadingPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="condensed">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

HeadingPaddingCondensed.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const HeadingPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="normal">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

HeadingPaddingNormal.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const HeadingPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="spacious">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

HeadingPaddingSpacious.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="condensed">
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualPaddingCondensed.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="normal">
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualPaddingNormal.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="spacious">
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualPaddingSpacious.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualAsBackground: StoryFn<typeof Bento> = () => (
  <Bento.Item visualAsBackground colorMode="dark">
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="A random avatar" src={universeImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualAsBackground.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const DarkModeItem: StoryFn<typeof Bento> = () => (
  <Bento.Item colorMode="dark">
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

DarkModeItem.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ResponsiveFlow: StoryFn<typeof Bento> = () => (
  <Bento.Item
    flow={{
      xsmall: 'row',
      small: 'row',
      medium: 'column',
      large: 'column',
      xlarge: 'column',
      xxlarge: 'column',
    }}
  >
    <Bento.Content padding="normal">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const VerticalAlignStart: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" verticalAlign="start">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const VerticalAlignCenter: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" verticalAlign="center">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const VerticalAlignEnd: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" verticalAlign="end">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

// TODO: This isn't working as expected yet
export const HorizontalAlignStart: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" horizontalAlign="start">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const HorizontalAlignCenter: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" horizontalAlign="center">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const HorizontalAlignEnd: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" horizontalAlign="end">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const ResponsiveHorizontalAlign: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content
      padding="normal"
      horizontalAlign={{
        xsmall: 'start',
        small: 'start',
        medium: 'center',
        large: 'center',
        xlarge: 'center',
        xxlarge: 'center',
      }}
    >
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const ResponsiveVerticalAlign: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content
      padding="normal"
      verticalAlign={{
        xsmall: 'start',
        small: 'start',
        medium: 'center',
        large: 'center',
        xlarge: 'center',
        xxlarge: 'center',
      }}
    >
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)
