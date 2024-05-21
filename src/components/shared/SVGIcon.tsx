// Add/Update SVG icons (from the design/Figma) here
import { cloneElement, memo, useMemo, type FC } from 'react';

import type { SVGIconProps } from 'src/types/shared';

const _SVGIcon: FC<SVGIconProps> = ({
  name,
  size,
  className,
  color,
  opacity,
  style: _style,
  ...props
}): JSX.Element | null => {
  let element: null | JSX.Element = null;
  const style = useMemo(
    () => {
      const hasSizeClass = className && /(^|\s)(w|h)-/.test(className);

      return {
        ...(hasSizeClass
          ? {}
          : { minHeight: size, minWidth: size, height: size, width: size }),
        opacity,
        ..._style
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size, opacity, _style]
  );

  switch (name) {
    case 'thumbs-up':
      element = (
        <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.8674 5.98491L11.6632 6.6443C11.496 7.18463 11.4123 7.45478 11.4766 7.66816C11.5287 7.84073 11.6429 7.98954 11.7986 8.08745C11.9911 8.20843 12.2822 8.20843 12.8644 8.20843H13.1741C15.1445 8.20843 16.1297 8.20843 16.5951 8.79171C16.6482 8.85833 16.6955 8.92925 16.7364 9.00361C17.0944 9.65405 16.6874 10.5304 15.8735 12.283C15.1265 13.8913 14.753 14.6954 14.0595 15.1688C13.9924 15.2145 13.9234 15.2578 13.8528 15.2983C13.1227 15.7168 12.2182 15.7168 10.409 15.7168H10.0166C7.82477 15.7168 6.72888 15.7168 6.04797 15.0571C5.36707 14.3973 5.36707 13.3354 5.36707 11.2118V10.4653C5.36707 9.3493 5.36707 8.79132 5.56513 8.28057C5.76319 7.76982 6.14243 7.34987 6.90093 6.50997L10.0377 3.03654C10.1163 2.94943 10.1557 2.90587 10.1904 2.87568C10.5141 2.59396 11.0137 2.62567 11.2968 2.94591C11.3271 2.98022 11.3603 3.02837 11.4265 3.12469C11.5301 3.27535 11.582 3.35068 11.6272 3.42531C12.0315 4.09344 12.1539 4.88712 11.9687 5.64059C11.948 5.72475 11.9211 5.81152 11.8674 5.98491Z"
            // fill="#BEBEBE"
          />
        </svg>
      );
      break;
  }

  return (
    element &&
    cloneElement(element, {
      ...props,
      'aria-label': name,
      color: color || 'currentColor',
      style,
      className: `SVGIcon ${className || ''}`
    })
  );
};

export const SVGIcon = memo(_SVGIcon);
