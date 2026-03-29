import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineCheckCircle,
  HiOutlineXCircle
} from 'react-icons/hi2'
import { FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../../config/emailjsConfig'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const Contact = () => {
  const { t } = useTranslation(['contact', 'common'])

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  // Liens sociaux
  const socialLinks = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://www.facebook.com/samsonjohannes.tahiniavo/',
      color: 'hover:text-[#1877F2]',
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: 'https://wa.me/261348870322',
      color: 'hover:text-[#25D366]',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/samson-johannes-tahiniavo-721aa6301/',
      color: 'hover:text-[#0A66C2]',
    },
  ]

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('contact:messages.validation.nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact:messages.validation.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact:messages.validation.emailInvalid')
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact:messages.validation.subjectRequired')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact:messages.validation.messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact:messages.validation.messageMinLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manage loading
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error of update fields
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.send(
        emailjsConfig.serviceId,      // EmailJS Service ID
        emailjsConfig.templateId,     // EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        emailjsConfig.publicKey       // EmailJS Public Key
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <section
      id="contact"
      className="min-h-screen py-16 scroll-mt-16 bg-secondary"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h1 className="text-5xl font-bold text-primary mb-4">
          {t('contact:title')}
        </h1>
        <p className="text-neutral-300 mb-12">
          {t('contact:subtitle')}
        </p>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact infos */}
          <div>
            <h2 className="text-2xl font-bold text-blue-200 mb-6">
              {t('contact:info.title')}
            </h2>

            <p className="text-neutral-300 mb-8 leading-relaxed">
              {t('contact:info.description')}
            </p>

            {/* Infos */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200/10 rounded-lg
                                flex items-center justify-center shrink-0">
                  <HiOutlineEnvelope className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Email</p>
                  <a
                    href={`mailto:${t('contact:info.email')}`}
                    className="text-blue-200 hover:underline"
                  >
                    {t('contact:info.email')}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200/10 rounded-lg
                                flex items-center justify-center shrink-0">
                  <HiOutlineMapPin className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Localisation</p>
                  <p className="text-neutral-200">
                    {t('contact:info.location')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm text-neutral-400">
                  {t('contact:info.availability')}
                </p>
              </div>
            </div>

            {/* Social networks */}
            <div>
              <h3 className="text-lg font-semibold text-blue-200 mb-4">
                {t('contact:social.title')}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`w-12 h-12 bg-neutral-800 border border-neutral-700
                                rounded-lg flex items-center justify-center
                                text-neutral-300 ${social.color}
                                transition-all duration-300
                                hover:border-current hover:-translate-y-1`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div>
            <h2 className="text-2xl font-bold text-blue-200 mb-6">
              {t('contact:form.title')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Nom */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  {t('contact:form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact:form.namePlaceholder')}
                  className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg
                              text-neutral-200 placeholder-neutral-500
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                              transition-colors ${errors.name
                      ? 'border-red-500'
                      : 'border-neutral-700 focus:border-blue-500'
                    }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  {t('contact:form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact:form.emailPlaceholder')}
                  className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg
                              text-neutral-200 placeholder-neutral-500
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                              transition-colors ${errors.email
                      ? 'border-red-500'
                      : 'border-neutral-700 focus:border-blue-500'
                    }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  {t('contact:form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact:form.subjectPlaceholder')}
                  className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg
                              text-neutral-200 placeholder-neutral-500
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                              transition-colors ${errors.subject
                      ? 'border-red-500'
                      : 'border-neutral-700 focus:border-blue-500'
                    }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  {t('contact:form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact:form.messagePlaceholder')}
                  className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg
                              text-neutral-200 placeholder-neutral-500
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                              transition-colors resize-none ${errors.message
                      ? 'border-red-500'
                      : 'border-neutral-700 focus:border-blue-500'
                    }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Send button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg
                           font-medium hover:bg-blue-700
                           disabled:bg-neutral-700 disabled:cursor-not-allowed
                           transition-colors duration-300
                           flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30
                                     border-t-white rounded-full animate-spin" />
                    {t('contact:form.sending')}
                  </>
                ) : (
                  t('contact:form.submit')
                )}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-green-500/10
                                border border-green-500/30 rounded-lg text-green-400">
                  <HiOutlineCheckCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{t('contact:messages.success')}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10
                                border border-red-500/30 rounded-lg text-red-400">
                  <HiOutlineXCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{t('contact:messages.error')}</p>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Contact