interface IPresenter {
  isShowCujian: Java.Method;
}
Java.perform(function () {
  const presenter = <IPresenter>(
    Java.use("com.bcut.homepage.presenter.CreatePresenter")
  );

  presenter.isShowCujian.implementation = () => {
    return true;
  };
});
