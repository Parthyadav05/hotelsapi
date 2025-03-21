const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Person = require('./models/person');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await Person.findOne({ username }).exec(); // Fixed variable reference
        if (!user) {
            return done(null, false, { message: 'Invalid username' });
        }

        // Secure password comparison using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Invalid password' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; // Fixed export
