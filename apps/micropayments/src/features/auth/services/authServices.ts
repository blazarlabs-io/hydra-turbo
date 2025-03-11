import { HYDRA_PAY_API } from "@/constants/envConsts";

export const setMicropaymentRoleService = async (token: string) => {
  try {
    if (!token) return;
    const baseUrl = `${HYDRA_PAY_API}/api/auth/micropayment-role`;
    console.log({ baseUrl, token });
    const resp = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bare ${token}`,
      },
    });
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};
