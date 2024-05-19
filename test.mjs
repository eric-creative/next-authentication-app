import bcrypt from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

const check1 = bcrypt.compareSync(myPlaintextPassword, hash, function (err, result) {
    // result == true
});
const check2 = bcrypt.compareSync(someOtherPlaintextPassword, hash)

console.log(hash, check1, check2)
