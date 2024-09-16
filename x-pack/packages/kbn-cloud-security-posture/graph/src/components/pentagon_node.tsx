/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { useEuiBackgroundColor, useEuiTheme } from '@elastic/eui';
import styled from '@emotion/styled';
import {
  NodeContainer,
  NodeLabel,
  NodeShapeOnHoverSvg,
  NodeShapeSvg,
  NodeIcon,
  NodeButton,
  NodeProps,
} from './shared/node';

const PentagonShapeOnHover = styled(NodeShapeOnHoverSvg)`
  transform: translate(-50%, -51.5%);
`;

export const PentagonNode = (props: NodeProps) => {
  const { id, color, icon, label, interactive, expandButtonClick } = props.data;
  const { euiTheme } = useEuiTheme();
  return (
    <NodeContainer>
      {!interactive || (
        <PentagonShapeOnHover
          width="91"
          height="88"
          viewBox="0 0 91 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M38.2615 4.25905L39.9523 3.03062L40.2462 3.43513L41.0916 2.82092C41.3054 2.66559 41.5253 2.52293 41.7502 2.39293L41.5001 1.96002C41.9895 1.67722 42.5017 1.4504 43.0277 1.27957L43.1822 1.75512C43.6829 1.59248 44.1972 1.48394 44.7159 1.42954L44.6638 0.932267C45.2197 0.873971 45.7803 0.873971 46.3362 0.932266L46.2841 1.42954C46.8028 1.48394 47.3171 1.59248 47.8178 1.75511L47.9723 1.27957C48.4983 1.4504 49.0105 1.67722 49.4999 1.96001L49.2497 2.39293C49.4747 2.52293 49.6946 2.66559 49.9084 2.82092L50.7538 3.43513L51.0477 3.03062L52.7385 4.25905L52.4446 4.66356L54.1353 5.89198L54.4292 5.48747L56.12 6.7159L55.8261 7.1204L57.5169 8.34883L57.8108 7.94432L59.5016 9.17274L59.2077 9.57725L60.8985 10.8057L61.1924 10.4012L62.8831 11.6296L62.5892 12.0341L64.28 13.2625L64.5739 12.858L66.2647 14.0864L65.9708 14.491L67.6616 15.7194L67.9555 15.3149L69.6463 16.5433L69.3524 16.9478L71.0432 18.1762L71.3371 17.7717L73.0278 19.0001L72.7339 19.4047L74.4247 20.6331L74.7186 20.2286L76.4094 21.457L76.1155 21.8615L77.8063 23.0899L78.1002 22.6854L79.791 23.9138L79.4971 24.3184L81.1879 25.5468L81.4817 25.1423L83.1725 26.3707L82.8786 26.7752L84.5694 28.0036L84.8633 27.5991L86.5541 28.8275L86.2602 29.2321L87.1056 29.8463C87.3194 30.0016 87.523 30.1666 87.7162 30.3404L88.0506 29.9687C88.4708 30.3468 88.8448 30.7638 89.1698 31.2113L88.7652 31.5051C89.0747 31.9312 89.3368 32.3867 89.5488 32.8632L90.0057 32.66C90.2329 33.1706 90.4061 33.7039 90.5225 34.2506L90.0334 34.3546C90.142 34.8648 90.1977 35.3874 90.1977 35.9139L90.6977 35.9139C90.6978 36.4669 90.6404 37.0242 90.5227 37.577L90.0336 37.4729C89.9795 37.727 89.9118 37.9802 89.8301 38.2315L89.5072 39.2254L89.9827 39.3799L89.3369 41.3675L88.8614 41.213L88.2156 43.2006L88.6911 43.3551L88.0453 45.3428L87.5697 45.1883L86.9239 47.1759L87.3995 47.3304L86.7536 49.318L86.2781 49.1635L85.6323 51.1511L86.1078 51.3057L85.462 53.2933L84.9865 53.1388L84.3406 55.1264L84.8162 55.2809L84.1703 57.2686L83.6948 57.114L83.049 59.1017L83.5245 59.2562L82.8787 61.2438L82.4032 61.0893L81.7574 63.0769L82.2329 63.2314L81.5871 65.2191L81.1115 65.0646L80.4657 67.0522L80.9412 67.2067L80.2954 69.1943L79.8199 69.0398L79.1741 71.0275L79.6496 71.182L79.0038 73.1696L78.5283 73.0151L77.8824 75.0027L78.358 75.1572L77.7121 77.1449L77.2366 76.9904L76.5908 78.978L77.0663 79.1325L76.4205 81.1201L75.945 80.9656L75.6221 81.9594C75.5404 82.2108 75.4464 82.4554 75.3408 82.6928L75.7976 82.896C75.5679 83.4125 75.2868 83.897 74.9617 84.3445L74.5572 84.0505C74.2477 84.4764 73.8955 84.8665 73.5078 85.2154L73.8422 85.5871C73.4268 85.961 72.9732 86.2905 72.4892 86.5701L72.2391 86.1372C71.7874 86.3981 71.3076 86.6125 70.8069 86.7753L70.9615 87.2508C70.4355 87.4218 69.8878 87.5394 69.3256 87.5982L69.2736 87.1009C69.0151 87.128 68.7534 87.1418 68.4891 87.1418H67.4442V87.6418H65.3542V87.1418H63.2643V87.6418H61.1744V87.1418H59.0845V87.6418H56.9946V87.1418H54.9047V87.6418H52.8147V87.1418H50.7248V87.6418H48.6349V87.1418H46.545V87.6418H44.455V87.1418H42.3651V87.6418H40.2752V87.1418H38.1853V87.6418H36.0954V87.1418H34.0054V87.6418H31.9155V87.1418H29.8256V87.6418H27.7357V87.1418H25.6457V87.6418H23.5558V87.1418H22.5109C22.2466 87.1418 21.9849 87.128 21.7264 87.1009L21.6744 87.5982C21.1122 87.5394 20.5645 87.4218 20.0385 87.2508L20.1931 86.7753C19.6924 86.6125 19.2126 86.3981 18.7609 86.1372L18.5108 86.5701C18.0268 86.2905 17.5732 85.961 17.1577 85.5871L17.4922 85.2154C17.1045 84.8665 16.7523 84.4764 16.4428 84.0505L16.0383 84.3445C15.7132 83.897 15.4321 83.4125 15.2024 82.896L15.6592 82.6928C15.5536 82.4554 15.4596 82.2108 15.3779 81.9595L15.055 80.9656L14.5795 81.1201L13.9337 79.1325L14.4092 78.978L13.7634 76.9904L13.2879 77.1449L12.642 75.1572L13.1176 75.0027L12.4717 73.0151L11.9962 73.1696L11.3504 71.182L11.8259 71.0275L11.1801 69.0398L10.7046 69.1944L10.0588 67.2067L10.5343 67.0522L9.88846 65.0646L9.41293 65.2191L8.76711 63.2315L9.24264 63.0769L8.59682 61.0893L8.12129 61.2438L7.47547 59.2562L7.951 59.1017L7.30517 57.114L6.82965 57.2686L6.18382 55.2809L6.65935 55.1264L6.01353 53.1388L5.538 53.2933L4.89218 51.3057L5.36771 51.1511L4.72189 49.1635L4.24636 49.318L3.60054 47.3304L4.07607 47.1759L3.43025 45.1882L2.95472 45.3428L2.3089 43.3551L2.78443 43.2006L2.1386 41.213L1.66308 41.3675L1.01726 39.3799L1.49278 39.2253L1.16987 38.2315C1.08821 37.9802 1.02048 37.727 0.966364 37.4729L0.477331 37.577C0.359603 37.0242 0.302175 36.4669 0.302251 35.9139L0.802251 35.9139C0.802323 35.3874 0.857998 34.8648 0.966564 34.3547L0.477514 34.2506C0.593851 33.7039 0.767116 33.1706 0.994337 32.66L1.45116 32.8632C1.6632 32.3867 1.92532 31.9312 2.23475 31.5052L1.8302 31.2113C2.15523 30.7638 2.52923 30.3468 2.94941 29.9687L3.28384 30.3404C3.47699 30.1666 3.68061 30.0016 3.89441 29.8463L4.7398 29.2321L4.44591 28.8275L6.13669 27.5991L6.43058 28.0036L8.12136 26.7752L7.82747 26.3707L9.51825 25.1423L9.81214 25.5468L11.5029 24.3184L11.209 23.9139L12.8998 22.6854L13.1937 23.0899L14.8845 21.8615L14.5906 21.457L16.2814 20.2286L16.5753 20.6331L18.266 19.4047L17.9722 19.0002L19.6629 17.7717L19.9568 18.1762L21.6476 16.9478L21.3537 16.5433L23.0445 15.3149L23.3384 15.7194L25.0292 14.491L24.7353 14.0864L26.4261 12.858L26.72 13.2625L28.4107 12.0341L28.1168 11.6296L29.8076 10.4012L30.1015 10.8057L31.7923 9.57726L31.4984 9.17275L33.1892 7.94432L33.4831 8.34883L35.1739 7.12041L34.88 6.7159L36.5708 5.48747L36.8647 5.89198L38.5554 4.66356L38.2615 4.25905Z"
            stroke={euiTheme.colors[color ?? 'primary']}
            strokeDasharray="2 2"
          />
        </PentagonShapeOnHover>
      )}
      <NodeShapeSvg
        width="75"
        height="72"
        viewBox="0 0 75 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33.0916 2.82091C35.7203 0.911085 39.2797 0.911086 41.9084 2.82092L70.5461 23.6274C73.1747 25.5373 74.2747 28.9225 73.2706 32.0127L62.332 65.6783C61.3279 68.7685 58.4483 70.8607 55.1991 70.8607H19.8009C16.5517 70.8607 13.6721 68.7685 12.668 65.6783L1.72938 32.0127C0.725323 28.9225 1.82526 25.5373 4.45392 23.6274L33.0916 2.82091Z"
          fill={useEuiBackgroundColor(color ?? 'primary')}
          stroke={euiTheme.colors[color ?? 'primary']}
        />
        {icon && <NodeIcon x="12.5" y="14.5" icon={icon} color={color} />}
      </NodeShapeSvg>
      {!interactive || (
        <NodeButton
          onClick={(e) => expandButtonClick && expandButtonClick(e, props)}
          x={91 - NodeButton.ExpandButtonSize / 2 + 'px'}
          y={(88 - NodeButton.ExpandButtonSize) / 2 + 'px'}
        />
      )}
      <NodeLabel>{Boolean(label) ? label : id}</NodeLabel>
    </NodeContainer>
  );
};
