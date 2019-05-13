import React from 'react';
import submitPage from '../submitPage'

const submitPageTest = new submitPage();

it('Test ValidateEmail function by inject valid and invalid email ', () => {
    const validEmail = 'test@unimelb.edu.au';
    const invalidEmail = 'foo@bar';
    expect(submitPageTest.ValidateEmail(validEmail)).toBe(true);
    expect(submitPageTest.ValidateEmail(invalidEmail)).toBe(false);
});