/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { AlertingPlugin, AlertingPluginsSetup, PluginSetupContract } from './plugin';
import { createUsageCollectionSetupMock } from 'src/plugins/usage_collection/server/mocks';
import { coreMock, statusServiceMock } from '../../../../src/core/server/mocks';
import { licensingMock } from '../../licensing/server/mocks';
import { encryptedSavedObjectsMock } from '../../encrypted_saved_objects/server/mocks';
import { taskManagerMock } from '../../task_manager/server/mocks';
import { eventLogServiceMock } from '../../event_log/server/event_log_service.mock';
import { KibanaRequest } from 'kibana/server';
import { featuresPluginMock } from '../../features/server/mocks';
import { KibanaFeature } from '../../features/server';
import { AlertingConfig } from './config';
import { RuleType } from './types';
import { eventLogMock } from '../../event_log/server/mocks';
import { actionsMock } from '../../actions/server/mocks';

describe('Alerting Plugin', () => {
  describe('setup()', () => {
    let plugin: AlertingPlugin;
    let coreSetup: ReturnType<typeof coreMock.createSetup>;
    let pluginsSetup: jest.Mocked<AlertingPluginsSetup>;

    beforeEach(() => jest.clearAllMocks());

    it('should log warning when Encrypted Saved Objects plugin is missing encryption key', async () => {
      const context = coreMock.createPluginInitializerContext<AlertingConfig>({
        healthCheck: {
          interval: '5m',
        },
        invalidateApiKeysTask: {
          interval: '5m',
          removalDelay: '1h',
        },
        maxEphemeralActionsPerAlert: 10,
        defaultRuleTaskTimeout: '5m',
        cancelAlertsOnRuleTimeout: true,
        minimumScheduleInterval: '1m',
      });
      plugin = new AlertingPlugin(context);

      const encryptedSavedObjectsSetup = encryptedSavedObjectsMock.createSetup();

      const setupMocks = coreMock.createSetup();
      // need await to test number of calls of setupMocks.status.set, because it is under async function which awaiting core.getStartServices()
      await plugin.setup(setupMocks, {
        licensing: licensingMock.createSetup(),
        encryptedSavedObjects: encryptedSavedObjectsSetup,
        taskManager: taskManagerMock.createSetup(),
        eventLog: eventLogServiceMock.create(),
        actions: actionsMock.createSetup(),
        statusService: statusServiceMock.createSetupContract(),
      });

      expect(setupMocks.status.set).toHaveBeenCalledTimes(1);
      expect(encryptedSavedObjectsSetup.canEncrypt).toEqual(false);
      expect(context.logger.get().warn).toHaveBeenCalledWith(
        'APIs are disabled because the Encrypted Saved Objects plugin is missing encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.'
      );
    });

    it('should create usage counter if usageCollection plugin is defined', async () => {
      const context = coreMock.createPluginInitializerContext<AlertingConfig>({
        healthCheck: {
          interval: '5m',
        },
        invalidateApiKeysTask: {
          interval: '5m',
          removalDelay: '1h',
        },
        maxEphemeralActionsPerAlert: 10,
        defaultRuleTaskTimeout: '5m',
        cancelAlertsOnRuleTimeout: true,
        minimumScheduleInterval: '1m',
      });
      plugin = new AlertingPlugin(context);

      const encryptedSavedObjectsSetup = encryptedSavedObjectsMock.createSetup();
      const usageCollectionSetup = createUsageCollectionSetupMock();

      const setupMocks = coreMock.createSetup();
      // need await to test number of calls of setupMocks.status.set, because it is under async function which awaiting core.getStartServices()
      await plugin.setup(setupMocks, {
        licensing: licensingMock.createSetup(),
        encryptedSavedObjects: encryptedSavedObjectsSetup,
        taskManager: taskManagerMock.createSetup(),
        eventLog: eventLogServiceMock.create(),
        actions: actionsMock.createSetup(),
        statusService: statusServiceMock.createSetupContract(),
        usageCollection: usageCollectionSetup,
      });

      expect(usageCollectionSetup.createUsageCounter).toHaveBeenCalled();
      expect(usageCollectionSetup.registerCollector).toHaveBeenCalled();
    });

    it(`exposes configured minimumScheduleInterval()`, async () => {
      const context = coreMock.createPluginInitializerContext<AlertingConfig>({
        healthCheck: {
          interval: '5m',
        },
        invalidateApiKeysTask: {
          interval: '5m',
          removalDelay: '1h',
        },
        maxEphemeralActionsPerAlert: 100,
        defaultRuleTaskTimeout: '5m',
        cancelAlertsOnRuleTimeout: true,
        minimumScheduleInterval: '1m',
      });
      plugin = new AlertingPlugin(context);

      const encryptedSavedObjectsSetup = encryptedSavedObjectsMock.createSetup();
      const setupContract = plugin.setup(coreMock.createSetup(), {
        licensing: licensingMock.createSetup(),
        encryptedSavedObjects: encryptedSavedObjectsSetup,
        taskManager: taskManagerMock.createSetup(),
        eventLog: eventLogServiceMock.create(),
        actions: actionsMock.createSetup(),
        statusService: statusServiceMock.createSetupContract(),
      });

      expect(setupContract.getConfig()).toEqual({ minimumScheduleInterval: '1m' });
    });

    describe('registerType()', () => {
      let setup: PluginSetupContract;
      const sampleRuleType: RuleType<never, never, never, never, never, 'default'> = {
        id: 'test',
        name: 'test',
        minimumLicenseRequired: 'basic',
        isExportable: true,
        actionGroups: [],
        defaultActionGroupId: 'default',
        producer: 'test',
        async executor() {},
      };

      beforeEach(async () => {
        coreSetup = coreMock.createSetup();
        pluginsSetup = {
          taskManager: taskManagerMock.createSetup(),
          encryptedSavedObjects: encryptedSavedObjectsMock.createSetup(),
          licensing: licensingMock.createSetup(),
          eventLog: eventLogMock.createSetup(),
          actions: actionsMock.createSetup(),
          statusService: statusServiceMock.createSetupContract(),
        };
        setup = plugin.setup(coreSetup, pluginsSetup);
      });

      it('should throw error when license type is invalid', async () => {
        expect(() =>
          setup.registerType({
            ...sampleRuleType,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            minimumLicenseRequired: 'foo' as any,
          })
        ).toThrowErrorMatchingInlineSnapshot(`"\\"foo\\" is not a valid license type"`);
      });

      it('should not throw when license type is gold', async () => {
        setup.registerType({
          ...sampleRuleType,
          minimumLicenseRequired: 'gold',
        });
      });

      it('should not throw when license type is basic', async () => {
        setup.registerType({
          ...sampleRuleType,
          minimumLicenseRequired: 'basic',
        });
      });

      it('should apply default config value for ruleTaskTimeout if no value is specified', async () => {
        const ruleType = {
          ...sampleRuleType,
          minimumLicenseRequired: 'basic',
        } as RuleType<never, never, never, never, never, 'default', never>;
        await setup.registerType(ruleType);
        expect(ruleType.ruleTaskTimeout).toBe('5m');
      });

      it('should apply value for ruleTaskTimeout if specified', async () => {
        const ruleType = {
          ...sampleRuleType,
          minimumLicenseRequired: 'basic',
          ruleTaskTimeout: '20h',
        } as RuleType<never, never, never, never, never, 'default', never>;
        await setup.registerType(ruleType);
        expect(ruleType.ruleTaskTimeout).toBe('20h');
      });

      it('should apply default config value for cancelAlertsOnRuleTimeout if no value is specified', async () => {
        const ruleType = {
          ...sampleRuleType,
          minimumLicenseRequired: 'basic',
        } as RuleType<never, never, never, never, never, 'default', never>;
        await setup.registerType(ruleType);
        expect(ruleType.cancelAlertsOnRuleTimeout).toBe(true);
      });

      it('should apply value for cancelAlertsOnRuleTimeout if specified', async () => {
        const ruleType = {
          ...sampleRuleType,
          minimumLicenseRequired: 'basic',
          cancelAlertsOnRuleTimeout: false,
        } as RuleType<never, never, never, never, never, 'default', never>;
        await setup.registerType(ruleType);
        expect(ruleType.cancelAlertsOnRuleTimeout).toBe(false);
      });
    });
  });

  describe('start()', () => {
    describe('getRulesClientWithRequest()', () => {
      it('throws error when encryptedSavedObjects plugin is missing encryption key', async () => {
        const context = coreMock.createPluginInitializerContext<AlertingConfig>({
          healthCheck: {
            interval: '5m',
          },
          invalidateApiKeysTask: {
            interval: '5m',
            removalDelay: '1h',
          },
          maxEphemeralActionsPerAlert: 10,
          defaultRuleTaskTimeout: '5m',
          cancelAlertsOnRuleTimeout: true,
          minimumScheduleInterval: '1m',
        });
        const plugin = new AlertingPlugin(context);

        const encryptedSavedObjectsSetup = encryptedSavedObjectsMock.createSetup();
        plugin.setup(coreMock.createSetup(), {
          licensing: licensingMock.createSetup(),
          encryptedSavedObjects: encryptedSavedObjectsSetup,
          taskManager: taskManagerMock.createSetup(),
          eventLog: eventLogServiceMock.create(),
          actions: actionsMock.createSetup(),
          statusService: statusServiceMock.createSetupContract(),
        });

        const startContract = plugin.start(coreMock.createStart(), {
          actions: actionsMock.createStart(),
          encryptedSavedObjects: encryptedSavedObjectsMock.createStart(),
          features: mockFeatures(),
          licensing: licensingMock.createStart(),
          eventLog: eventLogMock.createStart(),
          taskManager: taskManagerMock.createStart(),
        });

        expect(encryptedSavedObjectsSetup.canEncrypt).toEqual(false);
        expect(() =>
          startContract.getRulesClientWithRequest({} as KibanaRequest)
        ).toThrowErrorMatchingInlineSnapshot(
          `"Unable to create alerts client because the Encrypted Saved Objects plugin is missing encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command."`
        );
      });

      it(`doesn't throw error when encryptedSavedObjects plugin has encryption key`, async () => {
        const context = coreMock.createPluginInitializerContext<AlertingConfig>({
          healthCheck: {
            interval: '5m',
          },
          invalidateApiKeysTask: {
            interval: '5m',
            removalDelay: '1h',
          },
          maxEphemeralActionsPerAlert: 10,
          defaultRuleTaskTimeout: '5m',
          cancelAlertsOnRuleTimeout: true,
          minimumScheduleInterval: '1m',
        });
        const plugin = new AlertingPlugin(context);

        const encryptedSavedObjectsSetup = {
          ...encryptedSavedObjectsMock.createSetup(),
          canEncrypt: true,
        };
        plugin.setup(coreMock.createSetup(), {
          licensing: licensingMock.createSetup(),
          encryptedSavedObjects: encryptedSavedObjectsSetup,
          taskManager: taskManagerMock.createSetup(),
          eventLog: eventLogServiceMock.create(),
          actions: actionsMock.createSetup(),
          statusService: statusServiceMock.createSetupContract(),
        });

        const startContract = plugin.start(coreMock.createStart(), {
          actions: actionsMock.createStart(),
          encryptedSavedObjects: encryptedSavedObjectsMock.createStart(),
          features: mockFeatures(),
          licensing: licensingMock.createStart(),
          eventLog: eventLogMock.createStart(),
          taskManager: taskManagerMock.createStart(),
        });

        const fakeRequest = {
          headers: {},
          getBasePath: () => '',
          path: '/',
          route: { settings: {} },
          url: {
            href: '/',
          },
          raw: {
            req: {
              url: '/',
            },
          },
          getSavedObjectsClient: jest.fn(),
        } as unknown as KibanaRequest;
        startContract.getRulesClientWithRequest(fakeRequest);
      });
    });

    test(`exposes getAlertingAuthorizationWithRequest()`, async () => {
      const context = coreMock.createPluginInitializerContext<AlertingConfig>({
        healthCheck: {
          interval: '5m',
        },
        invalidateApiKeysTask: {
          interval: '5m',
          removalDelay: '1h',
        },
        maxEphemeralActionsPerAlert: 100,
        defaultRuleTaskTimeout: '5m',
        cancelAlertsOnRuleTimeout: true,
        minimumScheduleInterval: '1m',
      });
      const plugin = new AlertingPlugin(context);

      const encryptedSavedObjectsSetup = {
        ...encryptedSavedObjectsMock.createSetup(),
        canEncrypt: true,
      };
      plugin.setup(coreMock.createSetup(), {
        licensing: licensingMock.createSetup(),
        encryptedSavedObjects: encryptedSavedObjectsSetup,
        taskManager: taskManagerMock.createSetup(),
        eventLog: eventLogServiceMock.create(),
        actions: actionsMock.createSetup(),
        statusService: statusServiceMock.createSetupContract(),
      });

      const startContract = plugin.start(coreMock.createStart(), {
        actions: actionsMock.createStart(),
        encryptedSavedObjects: encryptedSavedObjectsMock.createStart(),
        features: mockFeatures(),
        licensing: licensingMock.createStart(),
        eventLog: eventLogMock.createStart(),
        taskManager: taskManagerMock.createStart(),
      });

      const fakeRequest = {
        headers: {},
        getBasePath: () => '',
        path: '/',
        route: { settings: {} },
        url: {
          href: '/',
        },
        raw: {
          req: {
            url: '/',
          },
        },
        getSavedObjectsClient: jest.fn(),
      } as unknown as KibanaRequest;
      startContract.getAlertingAuthorizationWithRequest(fakeRequest);
    });
  });
});

function mockFeatures() {
  const features = featuresPluginMock.createSetup();
  features.getKibanaFeatures.mockReturnValue([
    new KibanaFeature({
      id: 'appName',
      name: 'appName',
      app: [],
      category: { id: 'foo', label: 'foo' },
      privileges: {
        all: {
          savedObject: {
            all: [],
            read: [],
          },
          ui: [],
        },
        read: {
          savedObject: {
            all: [],
            read: [],
          },
          ui: [],
        },
      },
    }),
  ]);
  return features;
}
