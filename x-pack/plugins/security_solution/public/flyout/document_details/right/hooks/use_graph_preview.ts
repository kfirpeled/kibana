/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { EcsSecurityExtension as Ecs } from '@kbn/securitysolution-ecs';
import { get } from 'lodash/fp';
import type { GetFieldsData } from '../../shared/hooks/use_get_fields_data';
import { getFieldArray } from '../../shared/utils';

export interface UseGraphPreviewParams {
  /**
   * Retrieves searchHit values for the provided field
   */
  getFieldsData: GetFieldsData;

  /**
   * An object with top level fields from the ECS object
   */
  ecsData: Ecs;
}
/**
 * Interface for the result of the useGraphPreview hook
 */
export interface UseGraphPreviewResult {
  /**
   * Array of event IDs associated with the alert
   */
  eventIds: string[];

  /**
   * Array of actor entity IDs associated with the alert
   */
  actorsIds: string[];

  /**
   * Action associated with the event
   */
  action: string | undefined;

  /**
   * Boolean indicating if the event is an audit log (contains event ids, actor ids and action)
   */
  isAuditLog: boolean;
}

/**
 * Hook that returns the graph view configuration if the graph view is available for the alert
 */
export const useGraphPreview = ({
  getFieldsData,
  ecsData,
}: UseGraphPreviewParams): UseGraphPreviewResult => {
  const originalEventId = getFieldsData('kibana.alert.original_event.id');
  const eventId = getFieldsData('event.id');
  const eventIds = originalEventId ? getFieldArray(originalEventId) : getFieldArray(eventId);

  const actorsIds = getFieldArray(getFieldsData('actor.entity.id'));
  const action = get(['event', 'action'], ecsData);
  const isAuditLog = (actorsIds?.length ?? 0) > 0 && action?.length > 0 && eventIds?.length > 0;

  return { eventIds, actorsIds, action, isAuditLog };
};
