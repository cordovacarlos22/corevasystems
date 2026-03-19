"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sileo } from "sileo";
import * as yup from "yup";

export default function ContactSection({ dict, lang = "en" }) {
  const fallbackContact =
    lang === "es"
      ? {
        badge: "RESERVA UN ESPACIO",
        title: "¿Listo para comenzar?",
        info: {
          emailLabel: "Escríbenos",
          emailValue: "hello@corevasystems.com",
          callLabel: "Agenda una llamada",
          callValue: "Sesión estratégica",
        },
        form: {
          name: "Nombre completo",
          email: "Correo electrónico",
          company: "Nombre de la empresa",
          message: "Cuéntanos sobre los objetivos de tu proyecto",
          button: "Enviar mensaje",
          sending: "Enviando...",
        },
        toast: {
          loadingTitle: "Enviando mensaje...",
          successTitle: "Mensaje enviado",
          successDescription: "Te responderemos pronto.",
          errorTitle: "Algo salió mal",
          errorDescription: "Inténtalo de nuevo.",
        },
        validation: {
          fullNameRequired: "El nombre completo es obligatorio",
          fullNameMin: "El nombre completo es demasiado corto",
          emailRequired: "El correo electrónico es obligatorio",
          emailInvalid: "Ingresa un correo válido",
          messageRequired: "El mensaje es obligatorio",
          messageMin: "El mensaje debe tener al menos 10 caracteres",
        },
      }
      : {
        badge: "RESERVE A SLOT",
        title: "Ready to start?",
        info: {
          emailLabel: "Email our team",
          emailValue: "hello@corevasystems.com",
          callLabel: "Book a call",
          callValue: "Schedule Strategy Session",
        },
        form: {
          name: "Full Name",
          email: "Email Address",
          company: "Company Name",
          message: "Tell us about your project goals",
          button: "Send Message",
          sending: "Sending...",
        },
        toast: {
          loadingTitle: "Sending message...",
          successTitle: "Message sent",
          successDescription: "We’ll get back to you soon.",
          errorTitle: "Something went wrong",
          errorDescription: "Please try again.",
        },
        validation: {
          fullNameRequired: "Full name is required",
          fullNameMin: "Full name is too short",
          emailRequired: "Email is required",
          emailInvalid: "Enter a valid email",
          messageRequired: "Message is required",
          messageMin: "Message should be at least 10 characters",
        },
      };

  const contact = dict?.contact || fallbackContact;

  const contactSchema = yup.object({
    fullName: yup
      .string()
      .required(
        contact.validation?.fullNameRequired ||
        fallbackContact.validation.fullNameRequired
      )
      .min(
        2,
        contact.validation?.fullNameMin || fallbackContact.validation.fullNameMin
      ),
    email: yup
      .string()
      .required(
        contact.validation?.emailRequired ||
        fallbackContact.validation.emailRequired
      )
      .email(
        contact.validation?.emailInvalid || fallbackContact.validation.emailInvalid
      ),
    company: yup.string().nullable(),
    message: yup
      .string()
      .required(
        contact.validation?.messageRequired ||
        fallbackContact.validation.messageRequired
      )
      .min(
        10,
        contact.validation?.messageMin || fallbackContact.validation.messageMin
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      company: data.company?.trim() || "",
      message: data.message.trim(),
      locale: lang,
    };

    const request = fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const body = await res.json().catch(() => ({}));

      if (!res.ok || !body.ok) {
        throw new Error(body?.message || body?.error || "Failed");
      }

      return body;
    });

    sileo.promise(request, {
      loading: {
        title: contact.toast?.loadingTitle || fallbackContact.toast.loadingTitle,
      },
      success: {
        title: contact.toast?.successTitle || fallbackContact.toast.successTitle,
        description:
          contact.toast?.successDescription ||
          fallbackContact.toast.successDescription,
      },
      error: {
        title: contact.toast?.errorTitle || fallbackContact.toast.errorTitle,
        description:
          contact.toast?.errorDescription ||
          fallbackContact.toast.errorDescription,
      },
    });

    try {
      await request;
      reset();
    } catch { }
  };

  return (
    <section className="bg-slate-50/50 py-32" id="contact">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-24 text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            {contact.badge}
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {contact.title}
          </h2>
        </div>

        <div className="grid gap-20 lg:grid-cols-2">
          <div className="space-y-12">
            <div className="group flex gap-8">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-shadow group-hover:shadow-md">
                <span className="text-3xl">✉️</span>
              </div>
              <div>
                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {contact.info.emailLabel}
                </h4>
                <p className="text-2xl font-bold text-slate-900">
                  {contact.info.emailValue}
                </p>
              </div>
            </div>

            <div className="group flex gap-8">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-shadow group-hover:shadow-md">
                <span className="text-3xl">📅</span>
              </div>
              <div>
                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {contact.info.callLabel}
                </h4>
                <p className="text-2xl font-bold text-slate-900">
                  {contact.info.callValue}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-12 shadow-xl shadow-slate-200/50">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder={contact.form.name}
                    {...register("fullName")}
                    className="w-full rounded-xl border border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                  />
                  {errors.fullName && (
                    <div className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700">
                      <p>{errors.fullName.message}</p>
                    </div>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder={contact.form.email}
                    {...register("email")}
                    className="w-full rounded-xl border border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                  />
                  {errors.email && (
                    <div className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700">
                      <p>{errors.email.message}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder={contact.form.company}
                  {...register("company")}
                  className="w-full rounded-xl border border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
                {errors.company && (
                  <div className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700">
                    <p>{errors.company.message}</p>
                  </div>
                )}
              </div>

              <div>
                <textarea
                  placeholder={contact.form.message}
                  {...register("message")}
                  className="h-32 w-full rounded-xl border border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
                {errors.message && (
                  <div className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700">
                    <p>{errors.message.message}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="gradient-soft w-full rounded-xl py-5 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? contact.form.sending || fallbackContact.form.sending
                  : contact.form.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}