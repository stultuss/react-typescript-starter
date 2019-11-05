const {MessageOptions, FileDescriptorProto} = require('google-protobuf/google/protobuf/descriptor_pb');

const mock = require('../../mocks/lib/Utility');
const {Utility: Index} = require('../../build/lib/Utility');

test('filePathToPseudoNamespace ', () => {
  expect(Index.filePathToPseudoNamespace('book_market.proto')).toBe('book_market_pb');
});

test('snakeToCamel ', () => {
  expect(Index.snakeToCamel('book_market')).toBe('bookMarket');
});

test('ucFirst', () => {
  expect(Index.ucFirst('bookMarket')).toBe('BookMarket');
});

test('lcFirst', () => {
  expect(Index.lcFirst('BookMarket')).toBe('bookMarket');
});

test('isProto2', () => {
  expect.assertions(2);
  const fileDescriptor = new FileDescriptorProto();
  expect(Index.isProto2(fileDescriptor)).toBe(true);
  fileDescriptor.setSyntax('proto3');
  expect(Index.isProto2(fileDescriptor)).toBe(false);
});

test('oneOfName', () => {
  expect(Index.oneOfName('book_market')).toBe('BookMarket');
});

test('generateIndent', () => {
  expect(Index.generateIndent(4)).toBe('        ');
});

test('getPathToRoot', () => {
  expect.assertions(2);
  expect(Index.getPathToRoot('com.book_market.proto')).toBe('./');
  expect(Index.getPathToRoot('/opt/proto/com.book_market.proto')).toBe('../../../');
});

test('withinNamespaceFromExportEntry', () => {
  expect.assertions(2);
  const fieldEnumType1 = {
    pkg: 'com',
    fileName: 'com.book_market.proto',
    messageOptions: new MessageOptions()
  };
  expect(Index.withinNamespaceFromExportEntry('com.book_market.proto', fieldEnumType1)).toBe('book_market.proto');
  const fieldEnumType2 = {
    pkg: null,
    fileName: 'com.book_market.proto',
    messageOptions: new MessageOptions()
  };
  expect(Index.withinNamespaceFromExportEntry('com.book_market.proto', fieldEnumType2)).toBe('com.book_market.proto');
});

test('filePathFromProtoWithoutExtension', () => {
  expect(Index.filePathFromProtoWithoutExtension('book_market.proto')).toBe('book_market_pb');
});

test('svcFilePathFromProtoWithoutExtension', () => {
  expect(Index.svcFilePathFromProtoWithoutExtension('book_market.proto')).toBe('book_market_grpc_pb');
});

test('withAllStdIn', () => {
  expect.assertions(2);
  const spyFn = jest.spyOn(Index, 'withAllStdIn');
  const input = 'test';
  mock.withAllStdIn(Buffer.alloc(input.length, input));
  expect(spyFn).toHaveBeenCalled();
  expect(spyFn).toHaveBeenCalledTimes(1);
});

test('normaliseFieldObjectName', () => {
  expect.assertions(3);
  expect(Index.normaliseFieldObjectName('test')).toBe('test');
  expect(Index.normaliseFieldObjectName('abstract')).toBe('pb_abstract');
  expect(Index.normaliseFieldObjectName('with')).toBe('pb_with');
});
