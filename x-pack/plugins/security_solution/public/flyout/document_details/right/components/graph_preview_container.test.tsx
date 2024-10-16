/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { render } from '@testing-library/react';
import { TestProviders } from '../../../../common/mock';
import React from 'react';
import { DocumentDetailsContext } from '../../shared/context';
import { mockContextValue } from '../../shared/mocks/mock_context';
import { GraphPreviewContainer } from './graph_preview_container';
import { GRAPH_PREVIEW_TEST_ID } from './test_ids';
import { useGraphPreview } from '../hooks/use_graph_preview';
import { useFetchGraphData } from '../hooks/use_fetch_graph_data';

import {
  EXPANDABLE_PANEL_CONTENT_TEST_ID,
  EXPANDABLE_PANEL_HEADER_TITLE_ICON_TEST_ID,
  EXPANDABLE_PANEL_HEADER_TITLE_LINK_TEST_ID,
  EXPANDABLE_PANEL_HEADER_TITLE_TEXT_TEST_ID,
  EXPANDABLE_PANEL_TOGGLE_ICON_TEST_ID,
} from '@kbn/security-solution-common';

jest.mock('../hooks/use_graph_preview');
jest.mock('../hooks/use_fetch_graph_data', () => ({
  useFetchGraphData: jest.fn(),
}));
const mockUseFetchGraphData = useFetchGraphData as jest.Mock;

const mockUseUiSetting = jest.fn().mockReturnValue([false]);
jest.mock('@kbn/kibana-react-plugin/public', () => {
  const original = jest.requireActual('@kbn/kibana-react-plugin/public');
  return {
    ...original,
    useUiSetting$: () => mockUseUiSetting(),
  };
});

const NO_GRAPH_MESSAGE = 'Missing data message.';

const renderGraphPreview = (context = mockContextValue) =>
  render(
    <TestProviders>
      <DocumentDetailsContext.Provider value={context}>
        <GraphPreviewContainer />
      </DocumentDetailsContext.Provider>
    </TestProviders>
  );

describe('<GraphPreviewContainer />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component and link in header', () => {
    mockUseFetchGraphData.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { nodes: [], edges: [] },
    });

    (useGraphPreview as jest.Mock).mockReturnValue(true);

    const { getByTestId, queryByTestId } = renderGraphPreview();

    expect(getByTestId(GRAPH_PREVIEW_TEST_ID)).toBeInTheDocument();
    expect(
      queryByTestId(EXPANDABLE_PANEL_HEADER_TITLE_LINK_TEST_ID(GRAPH_PREVIEW_TEST_ID))
    ).not.toBeInTheDocument();
    expect(
      queryByTestId(EXPANDABLE_PANEL_TOGGLE_ICON_TEST_ID(GRAPH_PREVIEW_TEST_ID))
    ).not.toBeInTheDocument();
    expect(
      getByTestId(EXPANDABLE_PANEL_HEADER_TITLE_ICON_TEST_ID(GRAPH_PREVIEW_TEST_ID))
    ).toBeInTheDocument();
    expect(
      getByTestId(EXPANDABLE_PANEL_CONTENT_TEST_ID(GRAPH_PREVIEW_TEST_ID))
    ).toBeInTheDocument();
    expect(
      getByTestId(EXPANDABLE_PANEL_HEADER_TITLE_TEXT_TEST_ID(GRAPH_PREVIEW_TEST_ID))
    ).toBeInTheDocument();
    expect(
      getByTestId(EXPANDABLE_PANEL_CONTENT_TEST_ID(GRAPH_PREVIEW_TEST_ID))
    ).not.toHaveTextContent(NO_GRAPH_MESSAGE);
  });

  it('should render error message and text in header', () => {
    mockUseFetchGraphData.mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
    });

    (useGraphPreview as jest.Mock).mockReturnValue(false);

    const { getByTestId } = renderGraphPreview();

    expect(
      getByTestId(EXPANDABLE_PANEL_HEADER_TITLE_TEXT_TEST_ID(GRAPH_PREVIEW_TEST_ID))
    ).toBeInTheDocument();
    expect(getByTestId(EXPANDABLE_PANEL_CONTENT_TEST_ID(GRAPH_PREVIEW_TEST_ID))).toHaveTextContent(
      NO_GRAPH_MESSAGE
    );
  });
});
