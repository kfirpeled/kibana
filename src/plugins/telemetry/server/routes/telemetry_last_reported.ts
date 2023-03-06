/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { IRouter, SavedObjectsClient } from '@kbn/core/server';
import type { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { v2 } from '../../common/types';
import { getTelemetrySavedObject, updateTelemetrySavedObject } from '../saved_objects';

export function registerTelemetryLastReported(
  router: IRouter,
  savedObjectsInternalClient$: Observable<SavedObjectsClient>
) {
  // GET to retrieve
  router.get(
    {
      path: '/api/telemetry/v2/last_reported',
      validate: false,
    },
    async (context, req, res) => {
      const savedObjectsInternalClient = await firstValueFrom(savedObjectsInternalClient$);
      const telemetrySavedObject = await getTelemetrySavedObject(savedObjectsInternalClient);

      const body: v2.FetchLastReportedResponse = {
        lastReported: telemetrySavedObject && telemetrySavedObject?.lastReported,
      };

      return res.ok({
        body,
      });
    }
  );

  // PUT to update
  router.put(
    {
      path: '/api/telemetry/v2/last_reported',
      validate: false,
    },
    async (context, req, res) => {
      const savedObjectsInternalClient = await firstValueFrom(savedObjectsInternalClient$);
      await updateTelemetrySavedObject(savedObjectsInternalClient, {
        lastReported: Date.now(),
      });

      return res.ok();
    }
  );
}
