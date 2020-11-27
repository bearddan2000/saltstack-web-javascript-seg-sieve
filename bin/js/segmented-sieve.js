
// This function uses simple sieve of eratosthenes to
// find primes upto sqrt(high)
function simpleSieve(limit, prime) {
  // bound is square root of "high"
  var bound = Math.sqrt(limit);

  var mark = new Array();

  for (var i = 0; i <= bound; i++)
    mark.push(true);

  for (var i = 2; i * i <= bound; i++) {
    if (mark[i] == true) {
      for (var j = i * i; j <= bound; j += i)
        mark[i] = false;
    }
  }

  // adding primes to vector
  for (var i = 2; i <= bound; i++) {
    if (mark[i] == true)
      prime.push(i);
  }
}

// Finds all prime numbers in range low to high
// using the primes we obtained from
// simple sieve
function segmentedSieve(low, high) {
  var output = "";
  var prime = [];
  simpleSieve(high, prime); // stores primes upto
  // sqrt(high) in prime

  var mark = [];
  for (var i = 0; i < (high - low) + 1; i++)
    mark.push(true);

  for (var i = 0; i < prime.length; i++) {
    // find minimum number in [low...high]
    // that is multiple of prime[i]
    var loLim = (low / prime[i]) * prime[i];
    // loLim += prime.get(i);
    if (loLim < low)
      loLim += prime[i];
    if (loLim == prime[i])
      loLim += prime[i];

    for (var j = loLim; j <= high; j += prime[i]) {
      if (j != prime[i])
        mark[j - low] = false;
    }
  }
  // print all primes in [low...high]
  for (var i = low; i <= high; i++) {
    if (mark[i - low] == true)
      output += i + " ";
  }
  return output;
}
