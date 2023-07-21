// @ts-ignore
import { AxiosResponse } from "axios";
import { ErrorsInterface } from "../../../../types/api";
import { Router } from "vue-router";
import router from "../../../../router";

class ErrorHandler {
  private router: Router;
  private errors: ErrorsInterface;
  private ignoredErrors: Array<number>;
  private readonly response: any;

  constructor(ignoredErrors: Array<number>, response: AxiosResponse) {
    this.ignoredErrors = ignoredErrors;

    this.router = router;
    this.response = response;
    this.errors = {
      "301": this.movedPermanently,
      "303": this.seeOther,
      "400": this.badRequest,
      "401": this.unauthorized,
      "402": this.paymentRequired,
      "403": this.forbidden,
      "404": this.notFound,
      "405": this.methodNotAllowed,
      "408": this.timeOut,
      "422": this.formValidation,
      "426": this.passwordExpired,
      "429": this.TooManyRequests,
      "500": this.serverError,
      unknown: this.unknown,
    };
  }

  async handle(): Promise<boolean> {
    const status = this.response?.status || "unknown";

    if (
      this.ignoredErrors.includes(status) ||
      !this.errors.hasOwnProperty(status)
    ) {
      return false;
    }

    await this.errors[status].bind(this)();
    return true;
  }

  async badRequest() {
    await this.router.push("/error/404");
  }

  async seeOther() {
    try {
      await this.router.push(JSON.parse(this.response.response).redirect);
    } catch (e) {
      await Promise.resolve();
    }
  }

  async unauthorized() {
    await this.router.push("/error/401");
  }

  async forbidden() {
    await this.router.push("/error/403");
  }

  async notFound() {
    await this.router.push("/error/404");
  }

  async unknown() {
    await this.router.push("/error/unknown");
  }

  async methodNotAllowed() {
    await this.router.push("/error/404");
  }

  async TooManyRequests() {
    await this.router.push("/error/404");
  }

  async timeOut() {
    await this.router.push("/error/404");
  }

  async formValidation() {
    await this.router.push("/error/404");
  }

  async passwordExpired() {
    await this.router.push("/error/404");
  }

  async serverError() {
    await this.router.push("/error/404");
  }

  async movedPermanently() {
    await this.router.push("/error/404");
  }

  async paymentRequired() {
    await this.router.push("/error/404");
  }
}

export default ErrorHandler;
