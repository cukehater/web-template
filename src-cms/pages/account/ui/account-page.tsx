import { apiGet } from '@cms/shared/api'
import { AccountType } from '@cms/shared/models'
import { PageTopTitle } from '@cms/shared/ui'
import { UserCog2 } from 'lucide-react'

import AccountTable from './account-table'

export default async function AccountPage() {
  const { data: accountData } = await apiGet<AccountType[]>('/api/account')

  return (
    <>
      <PageTopTitle
        description="관리자 계정을 관리합니다."
        icon={UserCog2}
        title="관리자 계정 관리"
      />

      <AccountTable accountData={accountData || []} />
    </>
  )
}
