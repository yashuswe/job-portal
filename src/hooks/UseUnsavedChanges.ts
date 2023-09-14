import { useEffect, useState } from 'react';

const useUnsavedChanges = () => {
  const [isFormDirty, setIsFormDirty] = useState(false);

  const handleBeforeUnload = (e:any) => {
    if (isFormDirty) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
  };

  const addDirtyListener = (inputElement:any) => {
    inputElement.addEventListener('input', () => {
      setIsFormDirty(true);
    });
  };

  const handleLinkClick = (e:any) => {
    if (isFormDirty) {
      e.preventDefault();
      const confirmation = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (confirmation) {
        setIsFormDirty(false);
        window.location.href = e.target.href;
      }
    }
  };

  const handlePopState = (e:any) => {
    if (isFormDirty) {
      const confirmation = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmation) {
        window.history.pushState({}, document.title, e.state.url);
      } else {
        setIsFormDirty(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach((inputElement) => {
      addDirtyListener(inputElement);
    });
    return () => {
      inputElements.forEach((inputElement) => {
        inputElement.removeEventListener('input', addDirtyListener);
      });
    };
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFormDirty;
}

export default useUnsavedChanges;
