import { describe, it } from 'mocha';
import { expect } from 'chai';
import { composeAll } from '../';

describe('composeAll', () => {
  it('should compose multiple composers together', () => {
    const composerFn1 = a => (a + '-one');
    const composerFn2 = a => (a + '-two');

    const result = composeAll(
      composerFn1,
      composerFn2
    )('input');

    expect(result).to.be.equal('input-one-two');
  });

  it('should throw an error if composer is not a function', () => {
    const composerFn = 'invalidComposer';
    const run = () => composeAll(composerFn)('input');
    expect(run).to.throw(/Composer should be a function/);
  });

  it('should throw an error if composer return nothing', () => {
    const composerFn = () => null;
    const run = () => composeAll(composerFn)('input');
    expect(run).to.throw(/Composer function should return a value/);
  });

  it('should throw an error if composer return nothing', () => {
    const composerFn = () => 'abc';
    const run = () => composeAll(composerFn)();
    expect(run).to.throw(/Curry function of composeAll needs an input/);
  });
});
