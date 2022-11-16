describe('Example test', () => {
    it('equals true', () => {
        expect(true).toEqual(true);
    })
})

function addNumbers(num1, num2) {
    return num1 + num2;
}

describe('addNumbers', () => {
    it('add two numbers', () => {
        expect(addNumbers(2, 1)).toEqual(3)
    })
})