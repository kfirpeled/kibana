/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export const EVENT_GRAPH_VISUALIZATION_API = '/internal/cloud_security_posture/graph' as const;

/**
 * The actor entity ID is the entity that is performing an action, such as a user or a service account.
 */
export const ENTITY_ID = 'entity.id' as const;

/**
 * The target entity ID is the entity that is being acted upon, such as a resource or a system.
 */
export const ENTITY_TARGET_ID = 'entity.target.id' as const;

/**
 * The related entity is used to represent relationships between entities, such as a user and a resource.
 */
export const RELATED_ENTITY = 'related.entity' as const;

export const EVENT_ACTION = 'event.action' as const;
export const EVENT_ID = 'event.id' as const;
