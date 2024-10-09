/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  ELASTIC_HTTP_VERSION_HEADER,
  X_ELASTIC_INTERNAL_ORIGIN_REQUEST,
} from '@kbn/core-http-common';
import expect from '@kbn/expect';
import { FtrProviderContext } from '../ftr_provider_context';
import { result } from '../utils';

// eslint-disable-next-line import/no-default-export
export default function (providerContext: FtrProviderContext) {
  const { getService } = providerContext;

  const supertest = getService('supertest');
  const esArchiver = getService('esArchiver');

  describe('POST /internal/cloud_security_posture/graph', () => {
    before(async () => {
      await esArchiver.loadIfNeeded(
        'x-pack/test/cloud_security_posture_api/es_archives/logs_gcp_audit'
      );
    });

    after(async () => {
      await esArchiver.unload('x-pack/test/cloud_security_posture_api/es_archives/logs_gcp_audit');
    });

    it('should return an empty graph', async () => {
      const response = await supertest
        .post('/internal/cloud_security_posture/graph')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .set('kbn-xsrf', 'true')
        .send({
          query: {
            actorIds: [],
            eventIds: [],
            start: 'now-1d/d',
            end: 'now/d',
          },
        })
        .expect(result(200));

      expect(response.body).to.have.property('nodes').length(0);
      expect(response.body).to.have.property('edges').length(0);
    });

    it('should return a graph with nodes and edges by actor', async () => {
      const response = await supertest
        .post('/internal/cloud_security_posture/graph')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .set('kbn-xsrf', 'true')
        .send({
          query: {
            actorIds: ['admin@example.com'],
            eventIds: [],
            start: '2024-09-01T00:00:00Z',
            end: '2024-09-02T00:00:00Z',
          },
        })
        .expect(result(200));

      expect(response.body).to.have.property('nodes').length(3);
      expect(response.body).to.have.property('edges').length(2);

      response.body.nodes.forEach((node: any) => {
        expect(node).to.have.property('color');
        expect(node.color).equal(
          'primary',
          `node color mismatched [node: ${node.id}] [actual: ${node.color}]`
        );
      });

      response.body.edges.forEach((edge: any) => {
        expect(edge).to.have.property('color');
        expect(edge.color).equal(
          'primary',
          `edge color mismatched [edge: ${edge.id}] [actual: ${edge.color}]`
        );
      });
    });

    it('should return a graph with nodes and edges by alert', async () => {
      const response = await supertest
        .post('/internal/cloud_security_posture/graph')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .set('kbn-xsrf', 'true')
        .send({
          query: {
            actorIds: [],
            eventIds: ['kabcd1234efgh5678'],
            start: '2024-09-01T00:00:00Z',
            end: '2024-09-02T00:00:00Z',
          },
        })
        .expect(result(200));

      expect(response.body).to.have.property('nodes').length(3);
      expect(response.body).to.have.property('edges').length(2);

      response.body.nodes.forEach((node: any) => {
        expect(node).to.have.property('color');
        expect(node.color).equal(
          'danger',
          `node color mismatched [node: ${node.id}] [actual: ${node.color}]`
        );
      });

      response.body.edges.forEach((edge: any) => {
        expect(edge).to.have.property('color');
        expect(edge.color).equal(
          'danger',
          `edge color mismatched [edge: ${edge.id}] [actual: ${edge.color}]`
        );
      });
    });

    it('color of alert of failed event should be danger', async () => {
      const response = await supertest
        .post('/internal/cloud_security_posture/graph')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .set('kbn-xsrf', 'true')
        .send({
          query: {
            actorIds: [],
            eventIds: ['failed-event'],
            start: '2024-09-01T00:00:00Z',
            end: '2024-09-02T00:00:00Z',
          },
        })
        .expect(result(200));

      expect(response.body).to.have.property('nodes').length(3);
      expect(response.body).to.have.property('edges').length(2);

      response.body.nodes.forEach((node: any) => {
        expect(node).to.have.property('color');
        expect(node.color).equal(
          'danger',
          `node color mismatched [node: ${node.id}] [actual: ${node.color}]`
        );
      });

      response.body.edges.forEach((edge: any) => {
        expect(edge).to.have.property('color');
        expect(edge.color).equal(
          'danger',
          `edge color mismatched [edge: ${edge.id}] [actual: ${edge.color}]`
        );
      });
    });

    it('color of event of failed event should be warning', async () => {
      const response = await supertest
        .post('/internal/cloud_security_posture/graph')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .set('kbn-xsrf', 'true')
        .send({
          query: {
            actorIds: ['admin2@example.com'],
            eventIds: [],
            start: '2024-09-01T00:00:00Z',
            end: '2024-09-02T00:00:00Z',
          },
        })
        .expect(result(200));

      expect(response.body).to.have.property('nodes').length(3);
      expect(response.body).to.have.property('edges').length(2);

      response.body.nodes.forEach((node: any) => {
        expect(node).to.have.property('color');

        expect(node.color).equal(
          node.shape === 'label' ? 'warning' : 'primary',
          `node color mismatched [node: ${node.id}] [actual: ${node.color}]`
        );
      });

      response.body.edges.forEach((edge: any) => {
        expect(edge).to.have.property('color');
        expect(edge.color).equal(
          'warning',
          `edge color mismatched [edge: ${edge.id}] [actual: ${edge.color}]`
        );
      });
    });

    it('2 grouped of events, 1 failed, 1 success', async () => {
      const response = await supertest
        .post('/internal/cloud_security_posture/graph')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .set('kbn-xsrf', 'true')
        .send({
          query: {
            actorIds: ['admin3@example.com'],
            eventIds: [],
            start: '2024-09-01T00:00:00Z',
            end: '2024-09-02T00:00:00Z',
          },
        })
        .expect(result(200));

      expect(response.body).to.have.property('nodes').length(5);
      expect(response.body).to.have.property('edges').length(6);

      response.body.nodes.forEach((node: any) => {
        if (node.shape !== 'group') {
          expect(node).to.have.property('color');
          expect(node.color).equal(
            node.shape === 'label' && node.id.includes('outcome(failed)') ? 'warning' : 'primary',
            `node color mismatched [node: ${node.id}] [actual: ${node.color}]`
          );
        }
      });

      response.body.edges.forEach((edge: any) => {
        expect(edge).to.have.property('color');
        expect(edge.color).equal(
          edge.id.includes('outcome(failed)') ? 'warning' : 'primary',
          `edge color mismatched [edge: ${edge.id}] [actual: ${edge.color}]`
        );
      });
    });
  });
}
