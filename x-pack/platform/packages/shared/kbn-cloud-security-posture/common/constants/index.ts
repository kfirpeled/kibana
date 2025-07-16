/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/** The base path for all cloud security posture pages. */
export const CLOUD_SECURITY_POSTURE_BASE_PATH = '/cloud_security_posture';

export const SECURITY_DEFAULT_DATA_VIEW_ID = 'security-solution-default';

// A mapping of in-development features to their status. These features should be hidden from users but can be easily
// activated via a simple code change in a single location.
export const INTERNAL_FEATURE_FLAGS = {
  showManageRulesMock: false,
  showFindingFlyoutEvidence: true,
} as const;

export const DETECTION_RULE_RULES_API_CURRENT_VERSION = '2023-10-31';

export * from './benchmark';
export * from './graph';
export * from './misconfigurations';
export * from './status';
export * from './vulnerabilities';
