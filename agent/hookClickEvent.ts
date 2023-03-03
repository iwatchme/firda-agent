let jclazz: any = null;
let jobj: any = null;

function getObjClassName(obj: any): string {
  if (!jclazz) {
    jclazz = Java.use("java.lang.Class");
  }
  if (!jobj) {
    jobj = Java.use("java.lang.Object");
  }
  return jclazz.getName.call(jobj.getClass.call(obj));
}

function watch(obj: any, mtdName: string) {
  const listener_name = getObjClassName(obj);
  const target = Java.use(listener_name);
  if (!target || !(mtdName in target)) {
    return;
  }
  target[mtdName].overloads.forEach(function (overload: any) {
    overload.implementation = function () {
      console.log("[WatchEvent] " + mtdName + ": " + getObjClassName(this));
      return this[mtdName].apply(this, arguments);
    };
  });
}

export default function hoolClickEvent() {
    Java.perform(function () {
        Java.choose("android.view.View$ListenerInfo", {
        onMatch: function (instance) {
            const listener = instance.mOnClickListener.value;
            if (listener != null) {
            watch(listener, "onClick");
            }
        },
        onComplete() {},
        });
    })
 
};