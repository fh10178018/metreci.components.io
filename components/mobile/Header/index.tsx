import React from 'react';



function Header({
  classes,
  headTitle = '',
  onClose,
  onGoBack,
  customStyle,
  hideHeaderPlaceholder,
}) {


  if (onClose || onGoBack) {
    // && headTitle : no title still need to show it
    heaser = (
      <>
        <div className={classes.iPopHeader} style={customStyle}>
          <span className={classes.popClose} onClick={onGoBack}>
            <Img src={Back} className={classes.icCloseIcon} />
          </span>
          <div className={classes.headTitle}>{headTitle}</div>
          {onClose ? (
            <span className={classes.popClose} onClick={onClose}>
              <Img src={iClose} className={classes.icCloseIcon} />
            </span>
          ) : (
            ''
          )}

          {/* <span className={classes.headTitle}>{headTitle}</span> */}
        </div>
        {hideHeaderPlaceholder ? (
          ''
        ) : (
          <div className={classes.iPopHeaderPlaceholder}>&nbsp;</div>
        )}
      </>
    );
  }
  return heaser;
}
