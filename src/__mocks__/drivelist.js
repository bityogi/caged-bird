
const drivelist = jest.genMockFromModule('drivelist');

let mockDrives = [];

function __setMockDrives(newMockDrives) {

  for (const drive in newMockDrives) {
    mockDrives.push[drive];
  }
}

function list() {
  return mockDrives;
}

drivelist.__setMockDrives = __setMockDrives;
drivelist.list = list;

module.exports = drivelist;
