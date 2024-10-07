/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { memo } from 'react';
import { useEuiBackgroundColor, useEuiTheme } from '@elastic/eui';
import { Handle, Position } from '@xyflow/react';
import {
  NodeContainer,
  NodeLabel,
  NodeShapeOnHoverSvg,
  NodeShapeSvg,
  NodeIcon,
  NodeButton,
  HandleStyleOverride,
} from './styles';
import type { EntityNodeViewModel, NodeProps } from '../types';

export const HexagonNode: React.FC<NodeProps> = memo((props: NodeProps) => {
  const { id, color, icon, label, interactive, expandButtonClick } =
    props.data as EntityNodeViewModel;
  const { euiTheme } = useEuiTheme();
  return (
    <NodeContainer>
      {!interactive || (
        <NodeShapeOnHoverSvg
          width="87"
          height="96"
          viewBox="0 0 87 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M32.9405 4.09653L34.6468 3.11138L34.8968 3.54439L35.75 3.05181C36.0442 2.88196 36.3426 2.72253 36.6446 2.57353L36.4234 2.12513C37.0538 1.81409 37.6998 1.54704 38.3569 1.32396L38.5176 1.79742C39.1609 1.57904 39.8151 1.40416 40.476 1.27278L40.3785 0.782377C41.0648 0.645946 41.758 0.554962 42.4535 0.509426L42.4862 1.00836C43.1613 0.964158 43.8387 0.964158 44.5138 1.00836L44.5465 0.509426C45.242 0.554962 45.9352 0.645945 46.6215 0.782377L46.524 1.27278C47.1849 1.40416 47.8391 1.57904 48.4824 1.79742L48.6431 1.32396C49.3002 1.54704 49.9462 1.8141 50.5766 2.12513L50.3554 2.57353C50.6574 2.72253 50.9558 2.88196 51.25 3.05181L52.1032 3.54439L52.3532 3.11138L54.0595 4.09653L53.8095 4.52954L55.5158 5.51469L55.7658 5.08168L57.4722 6.06683L57.2222 6.49984L58.9285 7.48499L59.1785 7.05198L60.8848 8.03713L60.6348 8.47014L62.3411 9.45529L62.5911 9.02228L64.2975 10.0074L64.0475 10.4404L65.7538 11.4256L66.0038 10.9926L67.7101 11.9777L67.4601 12.4107L69.1665 13.3959L69.4165 12.9629L71.1228 13.948L70.8728 14.381L72.5791 15.3662L72.8291 14.9332L74.5354 15.9183L74.2854 16.3513L75.9918 17.3365L76.2418 16.9035L77.9481 17.8886L77.6981 18.3216L78.5513 18.8142C78.8455 18.9841 79.1327 19.1628 79.4128 19.3498L79.6905 18.934C80.2751 19.3245 80.8293 19.7504 81.3511 20.2079L81.0214 20.5839C81.5322 21.0317 82.0107 21.5109 82.455 22.0175L82.8309 21.6879C83.2922 22.214 83.7176 22.7689 84.1048 23.3485L83.6891 23.6262C84.0649 24.1888 84.4036 24.7754 84.7029 25.3822L85.1513 25.161C85.4596 25.7861 85.7274 26.4319 85.9524 27.0945L85.479 27.2553C85.6956 27.8933 85.8713 28.5473 86.0038 29.2136L86.4942 29.116C86.6295 29.7966 86.7212 30.4896 86.7671 31.1911L86.2682 31.2237C86.2902 31.5598 86.3013 31.8979 86.3013 32.2376V33.2228H86.8013V35.1931H86.3013V37.1634H86.8013V39.1337H86.3013V41.104H86.8013V43.0743H86.3013V45.0446H86.8013V47.0149H86.3013V48.9851H86.8013V50.9555H86.3013V52.9258H86.8013V54.896H86.3013V56.8663H86.8013V58.8366H86.3013V60.8069H86.8013V62.7772H86.3013V63.7624C86.3013 64.1021 86.2902 64.4402 86.2682 64.7763L86.7671 64.8089C86.7212 65.5104 86.6295 66.2034 86.4942 66.884L86.0038 66.7864C85.8713 67.4527 85.6956 68.1067 85.479 68.7448L85.9524 68.9055C85.7274 69.5681 85.4596 70.2139 85.1513 70.839L84.7029 70.6179C84.4036 71.2246 84.0649 71.8112 83.6891 72.3738L84.1048 72.6516C83.7176 73.2311 83.2922 73.786 82.8309 74.3121L82.455 73.9825C82.0107 74.4891 81.5322 74.9683 81.0214 75.4161L81.3511 75.7921C80.8293 76.2496 80.2751 76.6755 79.6905 77.066L79.4128 76.6502C79.1327 76.8373 78.8455 77.0159 78.5513 77.1858L77.6981 77.6784L77.9481 78.1114L76.2418 79.0965L75.9918 78.6635L74.2854 79.6487L74.5354 80.0817L72.8291 81.0668L72.5791 80.6338L70.8728 81.619L71.1228 82.052L69.4165 83.0371L69.1665 82.6041L67.4601 83.5893L67.7101 84.0223L66.0038 85.0074L65.7538 84.5744L64.0475 85.5596L64.2975 85.9926L62.5911 86.9777L62.3411 86.5447L60.6348 87.5299L60.8848 87.9629L59.1785 88.948L58.9285 88.515L57.2222 89.5002L57.4722 89.9332L55.7658 90.9183L55.5158 90.4853L53.8095 91.4705L54.0595 91.9035L52.3532 92.8886L52.1032 92.4556L51.25 92.9482C50.9558 93.118 50.6574 93.2775 50.3554 93.4265L50.5766 93.8749C49.9462 94.1859 49.3002 94.453 48.6431 94.676L48.4824 94.2026C47.8391 94.421 47.1849 94.5958 46.524 94.7272L46.6215 95.2176C45.9352 95.354 45.242 95.445 44.5465 95.4906L44.5138 94.9916C43.8387 95.0358 43.1613 95.0358 42.4862 94.9916L42.4535 95.4906C41.758 95.445 41.0648 95.354 40.3785 95.2176L40.476 94.7272C39.8151 94.5958 39.1609 94.421 38.5176 94.2026L38.3569 94.676C37.6998 94.453 37.0538 94.1859 36.4234 93.8749L36.6446 93.4265C36.3426 93.2775 36.0442 93.118 35.75 92.9482L34.8968 92.4556L34.6468 92.8886L32.9405 91.9035L33.1905 91.4705L31.4842 90.4853L31.2342 90.9183L29.5278 89.9332L29.7778 89.5002L28.0715 88.515L27.8215 88.948L26.1152 87.9629L26.3652 87.5299L24.6589 86.5447L24.4089 86.9777L22.7025 85.9926L22.9525 85.5596L21.2462 84.5744L20.9962 85.0074L19.2899 84.0223L19.5399 83.5893L17.8335 82.6041L17.5835 83.0371L15.8772 82.052L16.1272 81.619L14.4209 80.6338L14.1709 81.0668L12.4646 80.0817L12.7146 79.6487L11.0082 78.6635L10.7582 79.0965L9.05189 78.1114L9.30189 77.6784L8.44873 77.1858C8.15453 77.0159 7.86728 76.8372 7.58722 76.6502L7.3095 77.066C6.72491 76.6755 6.17065 76.2496 5.64891 75.7921L5.97857 75.4161C5.46783 74.9683 4.98926 74.4891 4.54504 73.9825L4.16909 74.3121C3.70778 73.786 3.28238 73.2311 2.89519 72.6516L3.31094 72.3738C2.93511 71.8112 2.59643 71.2246 2.29715 70.6179L1.84873 70.839C1.5404 70.2139 1.27259 69.5681 1.04759 68.9055L1.52104 68.7447C1.30438 68.1067 1.1287 67.4527 0.996207 66.7864L0.505811 66.884C0.370461 66.2034 0.278755 65.5104 0.232886 64.8089L0.731821 64.7763C0.709847 64.4402 0.69873 64.1021 0.69873 63.7624V62.7772H0.19873V60.8069H0.69873V58.8366H0.19873V56.8663H0.69873V54.896H0.19873V52.9257H0.69873V50.9554H0.19873V48.9851H0.69873V47.0149H0.19873V45.0445H0.69873V43.0742H0.19873V41.104H0.69873V39.1337H0.19873V37.1634H0.69873V35.1931H0.19873V33.2228H0.69873V32.2376C0.69873 31.8979 0.709847 31.5598 0.731821 31.2237L0.232886 31.1911C0.278755 30.4896 0.370461 29.7966 0.505811 29.116L0.996207 29.2136C1.1287 28.5473 1.30438 27.8933 1.52104 27.2553L1.04759 27.0945C1.27259 26.4319 1.5404 25.7861 1.84873 25.161L2.29715 25.3822C2.59643 24.7754 2.93511 24.1888 3.31094 23.6262L2.89519 23.3485C3.28238 22.7689 3.70778 22.214 4.16909 21.6879L4.54504 22.0175C4.98926 21.5109 5.46783 21.0317 5.97857 20.5839L5.64891 20.2079C6.17065 19.7504 6.72491 19.3245 7.3095 18.934L7.58722 19.3498C7.86728 19.1628 8.15453 18.9841 8.44873 18.8142L9.3019 18.3216L9.0519 17.8886L10.7582 16.9035L11.0082 17.3365L12.7146 16.3513L12.4646 15.9183L14.1709 14.9332L14.4209 15.3662L16.1272 14.381L15.8772 13.948L17.5835 12.9629L17.8335 13.3959L19.5399 12.4107L19.2899 11.9777L20.9962 10.9926L21.2462 11.4256L22.9525 10.4404L22.7025 10.0074L24.4089 9.02227L24.6589 9.45529L26.3652 8.47014L26.1152 8.03713L27.8215 7.05198L28.0715 7.48499L29.7778 6.49984L29.5278 6.06683L31.2342 5.08168L31.4842 5.51469L33.1905 4.52954L32.9405 4.09653Z"
            stroke={euiTheme.colors[color ?? 'primary']}
            strokeDasharray="2 2"
          />
        </NodeShapeOnHoverSvg>
      )}
      <NodeShapeSvg
        width="71"
        height="78"
        viewBox="0 0 71 78"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.75 1.74241C34.0705 0.402668 36.9295 0.402668 39.25 1.74241L65.891 17.1236C68.2115 18.4634 69.641 20.9393 69.641 23.6188V54.3812C69.641 57.0607 68.2115 59.5366 65.891 60.8764L39.25 76.2576C36.9295 77.5973 34.0705 77.5973 31.75 76.2576L5.10898 60.8764C2.78847 59.5366 1.35898 57.0607 1.35898 54.3812V23.6188C1.35898 20.9393 2.78847 18.4634 5.10898 17.1236L31.75 1.74241Z"
          fill={useEuiBackgroundColor(color ?? 'primary')}
          stroke={euiTheme.colors[color ?? 'primary']}
        />
        {icon && <NodeIcon x="11" y="15" icon={icon} color={color} />}
      </NodeShapeSvg>
      {!interactive || (
        <NodeButton
          onClick={(e) => expandButtonClick && expandButtonClick(e, props)}
          x={`${87 - NodeButton.ExpandButtonSize / 2 + 2}px`}
          y={`${(96 - NodeButton.ExpandButtonSize) / 2 - 2}px`}
        />
      )}
      <Handle
        type="target"
        isConnectable={false}
        position={Position.Left}
        id="in"
        style={HandleStyleOverride}
      />
      <Handle
        type="source"
        isConnectable={false}
        position={Position.Right}
        id="out"
        style={HandleStyleOverride}
      />
      <NodeLabel>{Boolean(label) ? label : id}</NodeLabel>
    </NodeContainer>
  );
});
