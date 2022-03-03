/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { SecuritySolutionFactory } from '../../types';
import {
  HostsRiskScoreRequestOptions,
  HostsQueries,
  HostsRiskScoreStrategyResponse,
} from '../../../../../../common/search_strategy';
import type { IEsSearchResponse } from '../../../../../../../../../src/plugins/data/common';
import { inspectStringifyObject } from '../../../../../utils/build_query';
import { buildHostsRiskScoreQuery } from './query.hosts_risk.dsl';
import { DEFAULT_MAX_TABLE_QUERY_SIZE } from '../../../../../../common/constants';
import { getTotalCount } from '../../cti/event_enrichment/helpers';

export const riskScore: SecuritySolutionFactory<HostsQueries.hostsRiskScore> = {
  buildDsl: (options: HostsRiskScoreRequestOptions) => {
    if (options.pagination && options.pagination.querySize >= DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    return buildHostsRiskScoreQuery(options);
  },
  parse: async (
    options: HostsRiskScoreRequestOptions,
    response: IEsSearchResponse<unknown>
  ): Promise<HostsRiskScoreStrategyResponse> => {
    const inspect = {
      dsl: [inspectStringifyObject(buildHostsRiskScoreQuery(options))],
    };

    const totalCount = getTotalCount(response.rawResponse.hits.total);

    return {
      ...response,
      inspect,
      totalCount,
    };
  },
};
