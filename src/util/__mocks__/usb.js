import Q from 'q';

export const getUSBData = () => {
  var deferred = Q.defer();

  const signedTxPayload = {
    "transactionId" : 1234,
    "account" : "DACC",
    "clientAccount" : "11thFloorSoft.com",
    "coinDescription" : "Bitcoin",
    "ticker" : "BTC",
    "coldWalletDesc" : "Ice Cold Wallet",
    "coldWalletFileName" : null,
    "coldWalletAddress" : "1234coldaddress",
    "hotWalletDesc" : "Burning Hot Wallet",
    "hotWalletAddress" : "1234hotaddress",
    "amount" : 232.2340,
    "fee" : 1.44544,
    "memo" : "This transaction is signed and ready to be broadcast",
    "generatedOn" : "2018-03-07T09:18:26-05:00",
    "payload": "hellojjjlsdfuosfdjklsjflsjfdsjdflsjafd"
  };

  deferred.resolve(signedTxPayload);

  return deferred.promise;
}
