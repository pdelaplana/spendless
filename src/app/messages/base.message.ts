export abstract class BaseMessage<T> {
  payload: T;
  constructor(payload: T){
    this.payload = payload;
  }
}