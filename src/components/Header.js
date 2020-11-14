import { Box, Button, Stack, Text} from "@chakra-ui/core";

function Headers() {
  return (
    <Stack>
      <Box display="flex" justifyContent="space-between" p="3" shadow="md">
        <Button></Button>
        <Button></Button>
      </Box>
    </Stack>
  );
}

export default Headers;
