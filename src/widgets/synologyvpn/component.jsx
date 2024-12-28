import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;
  const { data: vpnData, error: vpnError } = useWidgetAPI(widget, "vpnStatus");

  if (vpnError) {
    return <Container service={service} error={vpnError} />;
  }

  const results = vpnData?.data?.result?.[0]?.data || [];
  const vpnStatus = results.map((config) => ({
    status: config.status,
    confname: config.confname,
  }));

  return (
    <Container service={service}>
      {vpnStatus.length > 0 ? (
        vpnStatus.map((config) => (
          <Block
            key={config.confname} // Use a unique identifier for the key
            label={t("VPN connection status")}
            value={`${config.status} (${config.confname})`}
          />
        ))
      ) : (
        <Block label={t("VPN connection status")} value={t("No VPN connections found")} />
      )}
    </Container>
  );
}
