'use strict';

const fs = jest.genMockFromModule('fs');

let mockFileData = '';

function __setMockFileData(data) {
    mockFileData = data;
}

function readFileSync(file, encoding) {
    return mockFileData;
}