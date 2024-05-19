import { BaseDto } from './base.dto'
import { DefaultContext } from './default-action-params'

export interface OnInit {
  init(typeName: string, context: DefaultContext): void
}

/**
 * Use this interface for Initialize resources instead constructor
 */
export interface AfterInit {
  afterInit(): void
}

abstract class ActionStep implements OnInit {
  private _typeName?: string
  private _context?: DefaultContext

  constructor(
    private readonly params?: object,
    private readonly id?: string
  ) {}

  getParams<T extends object = object>(): T {
    return (this.params as T) ?? {}
  }

  init(typeName: string, context: DefaultContext): void {
    this._context = context
    this._typeName = typeName
  }

  getTypeName(): string | undefined {
    return this._typeName
  }

  getId(): string | undefined {
    return this.id
  }

  getContext(): DefaultContext | undefined {
    return this._context
  }

  toDto(): BaseDto {
    if (this.id) {
      return {
        id: this.id,
        params: this.params ?? {},
        type: this.getTypeName() ?? ''
      }
    }
    return {
      params: this.params ?? {},
      type: this.getTypeName() ?? ''
    }
  }
}

export abstract class SourceAction extends ActionStep {
  abstract execute(): Promise<string>
}

export abstract class TargetAction extends ActionStep {
  abstract execute(data: string): Promise<void>
}

export abstract class TransformerAction extends ActionStep {
  constructor(id: string, params?: object) {
    super(params, id)
  }
  abstract execute(data: string): Promise<string>
}
