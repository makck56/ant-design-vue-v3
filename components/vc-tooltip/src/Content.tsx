import type { ExtractPropTypes } from 'vue';
import { defineComponent } from 'vue';
import PropTypes from '../../_util/vue-types';
import type { CustomSlotsType } from '../../_util/type';

const tooltipContentProps = {
  prefixCls: String,
  id: String,
  overlayInnerStyle: PropTypes.any,
};

export type TooltipContentProps = Partial<ExtractPropTypes<typeof tooltipContentProps>>;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Content',
  props: tooltipContentProps,
  slots: Object as CustomSlotsType<{
    overlay: any;
    default: any;
  }>,
  setup(props: TooltipContentProps, { slots }) {
    return () => (
      <div
        class={`${props.prefixCls}-inner`}
        id={props.id}
        role="tooltip"
        style={props.overlayInnerStyle}
      >
        {slots.overlay?.()}
      </div>
    );
  },
});
