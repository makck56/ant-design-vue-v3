import type { BaseCascaderProps, ShowSearchType } from '../Cascader';
import type { Ref } from 'vue';
import { ref, watchEffect } from 'vue';
import { warning } from '../../vc-util/warning';

// Convert `showSearch` to unique config
export default function useSearchConfig(showSearch?: Ref<BaseCascaderProps['showSearch']>) {
  const mergedShowSearch = ref(false);
  const mergedSearchConfig = ref<ShowSearchType>({});
  watchEffect(() => {
    if (!showSearch.value) {
      mergedShowSearch.value = false;
      mergedSearchConfig.value = {};
      return;
    }

    let searchConfig: ShowSearchType = {
      matchInputWidth: true,
      limit: 50,
    };

    if (showSearch.value && typeof showSearch.value === 'object') {
      searchConfig = {
        ...searchConfig,
        ...showSearch.value,
      };
    }

    if (typeof searchConfig.limit === 'number' && searchConfig.limit <= 0) {
      delete searchConfig.limit;

      if (process.env.NODE_ENV !== 'production') {
        warning(false, "'limit' of showSearch should be positive number or false.");
      }
    }
    mergedShowSearch.value = true;
    mergedSearchConfig.value = searchConfig;
    return;
  });
  return { showSearch: mergedShowSearch, searchConfig: mergedSearchConfig };
}
