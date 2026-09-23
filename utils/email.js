

// generrate random email for registration

function randomEmail() {
  const randomString = Math.random().toString().substring(2, 11);
  return `${randomString}@example.com`;
}

module.exports = { randomEmail };