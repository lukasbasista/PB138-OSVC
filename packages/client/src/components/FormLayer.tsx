import React, { useCallback } from 'react';

import { Box, Layer } from 'grommet';

interface FormLayerProps {
  openProp: boolean;
  setOpenProp: any;
  children: any;
  detailProp: boolean;
  setDetailProp: any;
  setAPIPathState: any;
}

export const FormLayer: React.FC<FormLayerProps> = ({
  openProp,
  setOpenProp,
  setDetailProp,
  children,
  setAPIPathState,
}) => {
  const onClose = useCallback(() => {
    setOpenProp(false);
    setAPIPathState('');
  }, [setOpenProp, setDetailProp]);
  return (
    <div>
      {openProp && (
        <Layer onClickOutside={onClose} onEsc={onClose}>
          <Box
            align="stretch"
            width="large"
            overflow="auto"
            pad={{ horizontal: 'large', bottom: 'large' }}
          >
            {children}
          </Box>
        </Layer>
      )}
    </div>
  );
};
