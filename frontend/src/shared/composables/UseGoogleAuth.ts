//google script is loaded externally
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let googleCodeClient: any = null

export function useGoogleAuth() {
  const provider = 'GOOGLE'

  function initGoogleAuth(onSuccess: (code: string, platform: string) => void) {
    // @ts-expect-error google script is loaded externally
    const googleAPI = window.google

    googleCodeClient = googleAPI.accounts.oauth2.initCodeClient({
      client_id:
        '805742976196-4bj7hpottmjtmovej3kbanurpsv62mek' +
        '.apps.googleusercontent.com',
      scope: 'profile email',
      callback: (response: { code?: string }) => {
        if (!response.code) return

        onSuccess(response.code, provider)
      },
    })
  }

  function authenticateWithGoogle() {
    googleCodeClient?.requestCode()
  }

  return { initGoogleAuth, authenticateWithGoogle }
}
