/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { MisconfigurationEvaluationStatus } from '../types/misconfigurations';

export const FINDINGS_INDEX_PATTERN = 'logs-cloud_security_posture.findings-default*';
export const KSPM_POLICY_TEMPLATE = 'kspm';
export const CSPM_POLICY_TEMPLATE = 'cspm';
export const CDR_LATEST_NATIVE_MISCONFIGURATIONS_INDEX_ALIAS =
  'security_solution-cloud_security_posture.misconfiguration_latest';

export const DEPRECATED_CDR_LATEST_NATIVE_MISCONFIGURATIONS_INDEX_PATTERN =
  'logs-cloud_security_posture.findings_latest-default';

export const CDR_LATEST_THIRD_PARTY_MISCONFIGURATIONS_INDEX_PATTERN =
  'security_solution-*.misconfiguration_latest';
export const CDR_MISCONFIGURATIONS_INDEX_PATTERN = `${CDR_LATEST_NATIVE_MISCONFIGURATIONS_INDEX_ALIAS},${CDR_LATEST_THIRD_PARTY_MISCONFIGURATIONS_INDEX_PATTERN}`;

export const CDR_MISCONFIGURATIONS_DATA_VIEW_NAME = 'Latest Cloud Security Misconfigurations';
export const LATEST_FINDINGS_RETENTION_POLICY = '26h';
export const MAX_FINDINGS_TO_LOAD = 500;

export const CDR_MISCONFIGURATIONS_DATA_VIEW_ID_PREFIX =
  'security_solution_cdr_latest_misconfigurations';

export const CSP_MISCONFIGURATIONS_DATASET = 'cloud_security_posture.findings';

export const CSP_MOMENT_FORMAT = 'MMMM D, YYYY @ HH:mm:ss.SSS';

export const MISCONFIGURATION_STATUS: Record<string, MisconfigurationEvaluationStatus> = {
  PASSED: 'passed',
  FAILED: 'failed',
  UNKNOWN: 'unknown',
};
