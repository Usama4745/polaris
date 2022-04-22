import { AppProvider, Stack,Badge } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <Stack>
  <Badge>Paid</Badge>
  <Badge>Processing</Badge>
  <Badge>Fulfilled</Badge>
  <Badge>Completed</Badge>
</Stack>
      </div>
    </AppProvider>
  );
}

export default Example;
    