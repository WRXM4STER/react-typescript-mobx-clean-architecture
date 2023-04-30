import {describe, expect } from '@jest/globals';
import { mapToDomain } from './map-to-domain.mapper';

const testContactData = [
    {
        id:1,
        name:'Test Name 1',
        phone:'+79998887766',
    },
    {
        id:2,
        name:'Test Name 2',
        phone:'+79998887755',
    }
]

const testContactDomain = [
    {
        id:1,
        name:'Test Name 1',
        phone:'+79998887766',
        is_edit:false
    },
    {
        id:2,
        name:'Test Name 2',
        phone:'+79998887755',
        is_edit:false
    }
]

describe('map to domain test', () => {

    it('should be mapped to domain', () => {
        const result = mapToDomain(testContactData)
        expect(result).toEqual(testContactDomain)
    });

});