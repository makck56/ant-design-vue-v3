import { isLeaf, toPathKey } from '../utils/commonUtil';
import Checkbox from './Checkbox';
import type { DefaultOptionType, SingleValueType } from '../Cascader';
import { SEARCH_MARK } from '../hooks/useSearchOptions';
import type { Key } from '../../_util/type';
import { useInjectCascader } from '../context';
export const FIX_LABEL = '__cascader_fix_label__';
export interface ColumnProps {
  level: number;
  prefixCls: string;
  multiple?: boolean;
  options: DefaultOptionType[];
  /** Current Column opened item key */
  activeValue?: Key;
  /** The value path before current column */
  prevValuePath: Key[];
  onToggleOpen: (open: boolean) => void;
  onSelect: (valuePath: SingleValueType, leaf: boolean) => void;
  onActive: (valuePath: SingleValueType) => void;
  checkedSet: Set<Key>;
  halfCheckedSet: Set<Key>;
  loadingKeys: Key[];
  isSelectable: (option: DefaultOptionType) => boolean;
}

export default function Column(props: ColumnProps, context: any) {
  const { slots } = context;
  const {
    prefixCls,
    multiple,
    options,
    activeValue,
    prevValuePath,
    onToggleOpen,
    onSelect,
    onActive,
    checkedSet,
    halfCheckedSet,
    loadingKeys,
    isSelectable,
  } = props;
  const menuPrefixCls = `${prefixCls}-menu`;
  const menuItemPrefixCls = `${prefixCls}-menu-item`;

  const {
    fieldNames,
    changeOnSelect,
    expandTrigger,
    expandIcon: expandIconRef,
    loadingIcon: loadingIconRef,
    dropdownMenuColumnStyle,
    customSlots,
  } = useInjectCascader() as any;
  const expandIcon = expandIconRef.value ?? customSlots.value.expandIcon?.();
  const loadingIcon = loadingIconRef.value ?? customSlots.value.loadingIcon?.();

  const hoverOpen = expandTrigger.value === 'hover';
  // ============================ Render ============================
  const menuNodes = (
    <ul class={menuPrefixCls} role="menu">
      {options.map(option => {
        const { disabled } = option;
        const searchOptions = option[SEARCH_MARK];
        const label = option[FIX_LABEL] ?? option[fieldNames.value.label];
        const value = option[fieldNames.value.value];

        const isMergedLeaf = isLeaf(option, fieldNames.value);

        // Get real value of option. Search option is different way.
        const fullPath = searchOptions
          ? searchOptions.map(opt => opt[fieldNames.value.value])
          : [...prevValuePath, value];
        const fullPathKey = toPathKey(fullPath);

        const isLoading = loadingKeys.includes(fullPathKey);

        // >>>>> checked
        const checked = checkedSet.has(fullPathKey);

        // >>>>> halfChecked
        const halfChecked = halfCheckedSet.has(fullPathKey);
        // >>>>> Open
        const triggerOpenPath = () => {
          if (!disabled && (!hoverOpen || !isMergedLeaf)) {
            onActive(fullPath);
          }
        };

        // >>>>> Selection
        const triggerSelect = () => {
          if (isSelectable(option)) {
            onSelect(fullPath, isMergedLeaf);
          }
        };

        // >>>>> Title
        let title: string;
        if (typeof option.title === 'string') {
          title = option.title;
        } else if (typeof label === 'string') {
          title = label;
        }

        // >>>>> Render
        return (
          <li
            key={fullPathKey}
            class={[
              menuItemPrefixCls,
              {
                [`${menuItemPrefixCls}-expand`]: !isMergedLeaf,
                [`${menuItemPrefixCls}-active`]: activeValue === value,
                [`${menuItemPrefixCls}-disabled`]: disabled,
                [`${menuItemPrefixCls}-loading`]: isLoading,
              },
            ]}
            style={dropdownMenuColumnStyle.value}
            role="menuitemcheckbox"
            title={title}
            aria-checked={checked}
            data-path-key={fullPathKey}
            onClick={() => {
              triggerOpenPath();
              if (!multiple || isMergedLeaf) {
                triggerSelect();
              }
            }}
            onDblclick={() => {
              if (changeOnSelect.value) {
                onToggleOpen(false);
              }
            }}
            onMouseenter={() => {
              if (hoverOpen) {
                triggerOpenPath();
              }
            }}
            onMousedown={e => {
              // Prevent selector from blurring
              e.preventDefault();
            }}
          >
            {multiple && (
              <Checkbox
                prefixCls={`${prefixCls}-checkbox`}
                checked={checked}
                halfChecked={halfChecked}
                disabled={disabled}
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  triggerSelect();
                }}
              />
            )}
            <div class={`${menuItemPrefixCls}-content`}>
              {slots.option ? slots.option({ option, options }) : label}
            </div>
            {!isLoading && expandIcon && !isMergedLeaf && (
              <div class={`${menuItemPrefixCls}-expand-icon`}>{expandIcon}</div>
            )}
            {isLoading && loadingIcon && (
              <div class={`${menuItemPrefixCls}-loading-icon`}>{loadingIcon}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div>{slots?.dropdownRender ? slots?.dropdownRender({ ...props, menuNodes }) : menuNodes}</div>
  );
}
Column.props = [
  'level',
  'prefixCls',
  'multiple',
  'options',
  'activeValue',
  'prevValuePath',
  'onToggleOpen',
  'onSelect',
  'onActive',
  'checkedSet',
  'halfCheckedSet',
  'loadingKeys',
  'isSelectable',
];
Column.displayName = 'Column';
Column.inheritAttrs = false;
