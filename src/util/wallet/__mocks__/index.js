
import Q from 'q';

let _decodedHex;
export const __setDecodedHex = (decodedHex) => {
    _decodedHex = decodedHex;
}

export const decodeTransaction = (coin, hex) => {
  var deferred = Q.defer();
  const decodedTx = {
      value: 100000
  };
  deferred.resolve(decodedTx);

  return deferred.promise;
}
