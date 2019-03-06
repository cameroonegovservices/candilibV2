
import { storiesOf } from '@storybook/vue'

import AgGridAurigeStatusFilter from '../../views/admin/components/AgGridAurigeStatusFilter.vue'

storiesOf('Admin Components/Ag-Grid Component', module)
  .add('AgGridAurigeStatusFilter', () => ({
    components: { AgGridAurigeStatusFilter },
    template: '<ag-grid-aurige-status-filter />',

  }))
