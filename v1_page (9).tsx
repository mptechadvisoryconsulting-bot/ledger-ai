@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #f8fafc;
  color: #0f172a;
}

a {
  color: inherit;
  text-decoration: none;
}

@media print {
  .no-print {
    display: none !important;
  }

  body {
    background: white !important;
  }
}
