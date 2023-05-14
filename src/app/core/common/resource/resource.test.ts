import {describe, expect, test} from '@jest/globals';
import { Resource } from './resource';

describe('resource', () => {

    it('resource should be success', () => {
        const resource:Resource<string> = {
            success:'test-random-token'
        }
        expect(resource.success).toEqual('test-random-token')
        expect(resource.error).toEqual(undefined)
    });

    it('resource should be error', () => {
        const resource:Resource<string> = {
            error:'text-error'
        }
        expect(resource.success).toEqual(undefined)
        expect(resource.error).toEqual('text-error')
    });

});