/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { VulnSeverity } from '../types/vulnerabilities';

export const CDR_LATEST_NATIVE_VULNERABILITIES_INDEX_PATTERN =
  'logs-cloud_security_posture.vulnerabilities_latest-default';
export const CDR_LATEST_THIRD_PARTY_VULNERABILITIES_INDEX_PATTERN =
  'security_solution-*.vulnerability_latest';
export const CDR_VULNERABILITIES_INDEX_PATTERN = `${CDR_LATEST_THIRD_PARTY_VULNERABILITIES_INDEX_PATTERN},${CDR_LATEST_NATIVE_VULNERABILITIES_INDEX_PATTERN}`;
export const LATEST_VULNERABILITIES_RETENTION_POLICY = '3d';

// meant as a temp workaround to get good enough posture view for 3rd party integrations, see https://github.com/elastic/security-team/issues/10683 and https://github.com/elastic/security-team/issues/10801
export const CDR_EXTENDED_VULN_RETENTION_POLICY = '90d';

export const VULNERABILITIES_SEVERITY: Record<VulnSeverity, VulnSeverity> = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
  UNKNOWN: 'UNKNOWN',
};
