const { execFileSync } = require('child_process');

if (process.env.FAIL_LINT) {
  console.error('Intentional lint failure requested for CI verification.');
  process.exit(1);
}

execFileSync('eslint', ['.'], { stdio: 'inherit' });
