import React from 'react';
import SubmitPage from '../SubmitPage'

const SubmitPageTest = new SubmitPage();

it('Test ValidateEmail function by inject valid and invalid email ', () => {
    const validEmail = 'test@unimelb.edu.au';
    const invalidEmail = 'foo@bar';
    
    expect(SubmitPageTest.ValidateEmail(validEmail)).toBe(true);
    expect(SubmitPageTest.ValidateEmail(invalidEmail)).toBe(false);

});

it('Test ValidateContactInfo function by inject valid and invalid phone number ', () => {
    
    const valideNumber = '0403111111'
    const invalidNumber = '9111 11111'

    expect(SubmitPageTest.ValidateContactInfo(valideNumber)).toBe(true);
    expect(SubmitPageTest.ValidateContactInfo(invalidNumber)).toBe(false);

});