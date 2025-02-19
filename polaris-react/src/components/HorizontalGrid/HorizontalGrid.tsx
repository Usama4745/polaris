import React from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  getResponsiveValue,
  sanitizeCustomProperties,
} from '../../utilities/css';
import type {ResponsiveValue, ResponsiveProp} from '../../utilities/css';

import styles from './HorizontalGrid.scss';

type ColumnsAlias = 'oneThird' | 'oneHalf' | 'twoThirds';
type ColumnsType = number | string | ColumnsAlias[];
type Columns = ResponsiveProp<ColumnsType>;
type Gap = ResponsiveProp<SpaceScale>;
type HorizontalGridAlignItems = 'start' | 'end' | 'center';

export interface HorizontalGridProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** The number of columns to display. Accepts either a single value or an object of values for different screen sizes.
   * @example
   * columns={600}
   * columns={{xs: 100, sm: 100, md: 300, lg: 600, xl: 600}}
   */
  columns?: Columns;
  /** The spacing between children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='200'
   * gap={{xs: '100', sm: '200', md: '300', lg: '400', xl: '500'}}
   */
  gap?: Gap;
  /** Vertical alignment of children. If not set, inline elements will stretch to the height of the parent.
   * @example
   * alignItems='start'
   */
  alignItems?: HorizontalGridAlignItems;
}

export function HorizontalGrid({
  children,
  columns,
  gap,
  alignItems,
}: HorizontalGridProps) {
  const style = {
    ...getResponsiveValue(
      'horizontal-grid',
      'grid-template-columns',
      formatHorizontalGrid(columns),
    ),
    ...getResponsiveProps('horizontal-grid', 'gap', 'space', gap),
    '--pc-horizontal-grid-align-items': alignItems,
  } as React.CSSProperties;

  return (
    <div
      className={styles.HorizontalGrid}
      style={sanitizeCustomProperties(style)}
    >
      {children}
    </div>
  );
}

function formatHorizontalGrid(columns?: Columns): ResponsiveValue {
  if (
    typeof columns === 'object' &&
    columns !== null &&
    !Array.isArray(columns)
  ) {
    return Object.fromEntries(
      Object.entries(columns).map(
        ([breakpointAlias, breakpointHorizontalGrid]) => [
          breakpointAlias,
          getColumnValue(breakpointHorizontalGrid),
        ],
      ),
    );
  }

  return getColumnValue(columns);
}

function getColumnValue(columns?: ColumnsType) {
  if (!columns) return undefined;

  if (typeof columns === 'number' || !isNaN(Number(columns))) {
    return `repeat(${Number(columns)}, minmax(0, 1fr))`;
  }

  if (typeof columns === 'string') return columns;

  return columns
    .map((column) => {
      switch (column) {
        case 'oneThird':
          return 'minmax(0, 1fr)';
        case 'oneHalf':
          return 'minmax(0, 1fr)';
        case 'twoThirds':
          return 'minmax(0, 2fr)';
      }
    })
    .join(' ');
}
